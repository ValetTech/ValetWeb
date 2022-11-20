import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  Group,
  LoadingOverlay,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { upperFirst, useToggle } from '@mantine/hooks';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setCredentials } from '../../Features/Auth/authSlice';
import { UserLoginAsync, UserRegisterAsync } from '../../Services/ApiServices';
import CreatedNotification from '../Notifications/NotifyCreate';
import ErrorNotification from '../Notifications/NotifyError';
import LoggedInNotification from '../Notifications/NotifyLoggedIn';
import { GoogleButton, TwitterButton } from '../SocialButtons/SocialButtons';

export default function LoginForm({
  setModalOpened = () => {},
}: {
  setModalOpened: (value: boolean) => void;
}) {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [type, toggle] = useToggle(['login', 'register']);

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

  function Login({ email, password }: { email: string; password: string }) {
    setLoading(true);

    UserLoginAsync(email, password)
      .then((res) => {
        LoggedInNotification();
        const accessToken = res.data.token;
        const user = email;
        dispatch(setCredentials({ accessToken, user }));
        setModalOpened(false);
        if (pathname === '/') navigate('/dashboard');
      })
      .catch((err) => {
        ErrorNotification('Invalid email or password');
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function Register({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) {
    setLoading(true);

    UserRegisterAsync(username, email, password)
      .then((res) => {
        CreatedNotification();
        Login({ email, password });
      })
      .catch((err) => {
        ErrorNotification(err.response.data.message);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function onSubmit() {
    if (type === 'register') Register(form.values);
    else Login(form.values);
  }

  return (
    <div>
      {/* <Modal
        centered
        closeOnClickOutside={false}
        closeOnEscape={false}
        overlayBlur={1}
        trapFocus
        shadow="lg"
        // size="lg"
        opened={drawerOpened}
        onClose={() => setDrawerOpened(false)}
        withCloseButton={false}
        className="cursor-default"
      > */}
      <Paper radius="md" p="xl">
        <LoadingOverlay
          visible={loading}
          overlayBlur={2}
          className="cursor-progress"
        />

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

        <form onSubmit={form.onSubmit(onSubmit)}>
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
                label={
                  <>
                    I agree to Valet&apos;s{' '}
                    <Anchor size="sm" href="#" target="_blank">
                      Terms of Service and Privacy Policy
                    </Anchor>
                  </>
                }
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
      {/* </Modal> */}
    </div>
  );
}
