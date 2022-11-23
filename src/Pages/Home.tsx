// import Counter from '../features/counter/Counter';
import {
  Box,
  Button,
  Container,
  createStyles,
  Group,
  Modal,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useScrollLock } from '@mantine/hooks';
import { IconHelp, IconLogin } from '@tabler/icons';
import { useEffect, useState } from 'react';
import ToggleColor from '../Components/Buttons/ToggleColorScheme';
import LoginModal from '../Components/Login/LoginModal';
import '../index.css';

const BREAKPOINT = '@media (max-width: 755px)';

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    boxSizing: 'border-box',
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },

  inner: {
    position: 'relative',
    paddingTop: 200,
    paddingBottom: 120,

    [BREAKPOINT]: {
      paddingBottom: 80,
      paddingTop: 80,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 62,
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    paddingBottom: '1rem',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,

    [BREAKPOINT]: {
      fontSize: 42,
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: theme.spacing.xl,
    fontSize: 24,

    [BREAKPOINT]: {
      fontSize: 18,
    },
  },

  controls: {
    marginTop: theme.spacing.xl * 2,

    [BREAKPOINT]: {
      marginTop: theme.spacing.xl,
    },
  },

  control: {
    height: 54,
    paddingLeft: 38,
    paddingRight: 38,

    [BREAKPOINT]: {
      height: 54,
      paddingLeft: 18,
      paddingRight: 18,
      flex: 1,
    },
  },
}));

export default function Home() {
  const { classes } = useStyles();
  const [loginModalOpened, setLoginModalOpened] = useState(false);
  const [contactModalOpened, setContactModalOpened] = useState(false);
  const [scrollLocked, setScrollLocked] = useScrollLock();
  useEffect(() => {
    setScrollLocked(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // fontFamily: `Greycliff CF, ${theme.fontFamily}`,

  // fontSize: 42,
  // lineHeight: 1.2,

  // text-6xl font-black leading-none m-0 p-0 sm:text-6xl

  return (
    <div className={classes.wrapper}>
      <div className="p-5 flex flex-end">
        <ToggleColor />
      </div>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          A{' '}
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            inherit
          >
            fully featured
          </Text>{' '}
          Restaurant Management System
        </h1>
        <Text className={classes.description} color="dimmed">
          Seamlessly manage your restaurant from anywhere in the world.
        </Text>
        {/* <Card className="py-6">
          <AuthenticationForm />
        </Card> */}

        <Group className={classes.controls}>
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            leftIcon={<IconLogin size={20} />}
            onClick={() => setLoginModalOpened(true)}
          >
            Sign in
          </Button>

          <Button
            size="xl"
            variant="default"
            className={classes.control}
            leftIcon={<IconHelp size={20} />}
            onClick={() => setContactModalOpened(true)}
          >
            Contact Support
          </Button>
        </Group>
      </Container>
      <LoginModal
        modalOpened={loginModalOpened}
        setModalOpened={setLoginModalOpened}
      />
      <Modal
        opened={contactModalOpened}
        onClose={() => setContactModalOpened(false)}
        centered
        withCloseButton={false}
      >
        <Box>
          <Text size="xl" weight={500}>
            Contact Support
          </Text>
          <Text size="sm" color="gray">
            Please fill out the form below and we will get back to you as soon
            as possible.
          </Text>
          <form
            className="mt-4"
            onSubmit={(e) => {
              e.preventDefault();
              console.log('submit');
            }}
          >
            <TextInput
              label="Name"
              id="name"
              className="border border-gray-300 rounded-md p-2"
            />
            <TextInput
              label="Email"
              id="email"
              className="border border-gray-300 rounded-md p-2"
            />
            <Textarea
              label="Message"
              id="message"
              className="border border-gray-300 rounded-md p-2"
            />
            <div className="flex justify-end mt-4">
              <Button type="submit" className="px-4 py-2 rounded-md">
                Submit
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
