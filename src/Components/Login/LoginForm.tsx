import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Drawer,
} from '@mantine/core';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  selectCurrentUser,
  selectCurrentToken,
  setCredentials,
} from '../../Features/Auth/authSlice';
import { GoogleButton, TwitterButton } from '../SocialButtons/SocialButtons';
import { UserLoginAsync, UserRegisterAsync } from '../../Services/ApiServices';

export default function LoginForm(props: PaperProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [type, toggle] = useToggle(['login', 'register']);
  const [drawerOpened, setDrawerOpened] = useState(true);

  const form = useForm({
    initialValues: {
      email: '',
      username: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) =>
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
    },
  });

  return (
    <Drawer
      styles={{ closeButton: { color: '#1a1b1f' } }}
      closeButtonLabel=""
      size="lg"
      position="top"
      opened={drawerOpened}
      onClose={() => setDrawerOpened(true)}
    >
      <Paper radius="md" p="xl" {...props}>
        <Text size="lg" weight={500}>
          Welcome to Valet, {type} with
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
          <TwitterButton radius="xl">Twitter</TwitterButton>
        </Group>

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        <form
          onSubmit={form.onSubmit(() => {
            if (type === 'register') {
              UserRegisterAsync(
                form.values.username,
                form.values.email,
                form.values.password
              );
            }
            if (type === 'login') {
              try {
                const user = form.values.email;
                UserLoginAsync(form.values.email, form.values.password).then(
                  (response) => {
                    const accessToken = response.token;
                    dispatch(setCredentials({ accessToken, user }));
                    navigate('/dashboard');
                  }
                );
              } catch {
                console.log('Login failed');
              }
            }
          })}
        >
          <Stack>
            {type === 'register' && (
              <TextInput
                required
                placeholder="Your username"
                label="Username"
                value={form.values.username}
                onChange={(event) =>
                  form.setFieldValue('username', event.currentTarget.value)
                }
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue('email', event.currentTarget.value)
              }
              error={form.errors.email && 'Invalid email'}
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue('password', event.currentTarget.value)
              }
              error={
                form.errors.password &&
                'Password should include at least 6 characters'
              }
            />

            {type === 'register' && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) =>
                  form.setFieldValue('terms', event.currentTarget.checked)
                }
              />
            )}
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === 'register'
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit">{upperFirst(type)}</Button>
          </Group>
        </form>
      </Paper>
    </Drawer>
  );
}
