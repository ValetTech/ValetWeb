import { Button, ButtonProps, Group } from '@mantine/core';
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandTwitter,
} from '@tabler/icons';
import FacebookIcon from './FacebookIcon';
import GoogleIcon from './GoogleIcon';

export function GoogleButton(props: ButtonProps) {
  return (
    <Button
      leftIcon={<GoogleIcon />}
      variant="default"
      color="gray"
      {...props}
    />
  );
}

export function FacebookButton(props: ButtonProps) {
  return (
    <Button
      leftIcon={<FacebookIcon />}
      variant="default"
      color="gray"
      {...props}
    />
  );
}

// export function FacebookButton(props: ButtonProps) {
//   return (
//     <Button
//       leftIcon={<FacebookIcon />}
//       sx={(theme) => ({
//         backgroundColor: '#4267B2',
//         color: '#fff',
//         '&:hover': {
//           backgroundColor: theme.fn.darken('#4267B2', 0.1),
//         },
//       })}
//       {...props}
//     />
//   );
// }

export function DiscordButton(props: ButtonProps) {
  return (
    <Button
      leftIcon={<IconBrandDiscord size={16} />}
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? '#5865F2' : '#5865F2',
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.fn.lighten('#5865F2', 0.05)
              : theme.fn.darken('#5865F2', 0.05),
        },
      })}
      {...props}
    />
  );
}

// Twitter button as anchor
export function TwitterButton(
  props: ButtonProps & React.ComponentPropsWithoutRef<'a'>
) {
  return (
    <Button
      component="a"
      leftIcon={<IconBrandTwitter size={16} color="#00ACEE" />}
      variant="default"
      {...props}
    />
  );
}

export function GithubButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      leftIcon={<IconBrandGithub size={16} />}
      sx={(theme) => ({
        backgroundColor:
          theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
        color: '#fff',
        '&:hover': {
          backgroundColor:
            theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
        },
      })}
    />
  );
}

export function SocialButtons() {
  return (
    <Group position="center" sx={{ padding: 15 }}>
      <GoogleButton>Continue with Google</GoogleButton>
      <TwitterButton href="https://twitter.com/mantinedev" target="_blank">
        Follow on Twitter
      </TwitterButton>
      <FacebookButton>Sign in with Facebook</FacebookButton>
      <GithubButton>Login with GitHub</GithubButton>
      <DiscordButton>Join Discord community</DiscordButton>
    </Group>
  );
}
