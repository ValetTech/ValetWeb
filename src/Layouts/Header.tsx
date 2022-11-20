import {
  Anchor,
  Burger,
  Container,
  createStyles,
  Group,
  Image,
  Menu,
  NavLink,
  Text,
  UnstyledButton,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconCircleDotted, IconLogout } from '@tabler/icons';
import { useState } from 'react';
import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LogoBlue from '../Assets/Images/Logo/H-Logo.png';
import LogoWhite from '../Assets/Images/Logo/H-LogoWhite.png';
import { logOut, selectCurrentUser } from '../Features/Auth/authSlice';
// import UserButton from '../Components/User/UserButton';

interface HeaderSimpleProps {
  links: { link: string; label: string }[];
}

const useStyles = createStyles((theme) => ({
  header: {
    // backgroundColor:
    //   theme.colorScheme === 'dark'
    //     ? theme.colors.dark[6]
    //     : theme.colors.gray[0],
    [theme.fn.smallerThan('xs')]: {
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[2]
      }`,
    },

    // borderBottom: `1px solid ${
    //   theme.colorScheme === 'dark' ? 'transparent' : theme.colors.gray[2]
    // }`,
    marginBottom: theme.spacing.xs,
  },

  user: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    // padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },

    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },
}));

export default function Header({ links }: HeaderSimpleProps) {
  const { classes, theme, cx } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const { colorScheme } = useMantineColorScheme();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = {
    name: useSelector(selectCurrentUser),
    image: 'https://avatars.githubusercontent.com/u/1443320?v=4',
  };

  return (
    <div className={classes.header}>
      <Container className="py-2">
        {/* <Group position="right"> */}
        <Group className="justify-between xs:justify-end">
          <Anchor className="xs:hidden" component={Link} to="/">
            {colorScheme === 'dark' ? (
              <Image
                fit="contain"
                height={40}
                src={LogoWhite}
                alt="Valet Logo"
              />
            ) : (
              <Image
                fit="contain"
                height={40}
                src={LogoBlue}
                alt="Valet Logo"
              />
            )}
          </Anchor>

          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Burger
                opened={opened}
                onClick={toggle}
                className={classes.burger}
                size="sm"
              />
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Navigation</Menu.Label>
              <Menu.Item icon={<IconCircleDotted size={14} />}>
                <NavLink
                  component="a"
                  label="Dashboard"
                  onClick={() => {
                    navigate('/dashboard');
                    toggle();
                  }}
                />
              </Menu.Item>
              <Menu.Item icon={<IconCircleDotted size={14} />}>
                <NavLink
                  component="a"
                  label="Reservations"
                  onClick={() => {
                    navigate('/reservations');
                    toggle();
                  }}
                />
              </Menu.Item>
              {/* <Menu.Item icon={<IconCircleDotted size={14} />}>
                <NavLink component="a" label="Seating" href="/seating" />
              </Menu.Item>
              <Menu.Item icon={<IconCircleDotted size={14} />}>
                <NavLink component="a" label="Orders" href="/orders" />
              </Menu.Item> */}
              <Menu.Item icon={<IconCircleDotted size={14} />}>
                <NavLink
                  component="a"
                  label="Tables"
                  onClick={() => {
                    navigate('/tables');
                    toggle();
                  }}
                />
              </Menu.Item>
              <Menu.Item icon={<IconCircleDotted size={14} />}>
                <NavLink
                  component="a"
                  label="Calendar"
                  onClick={() => {
                    navigate('/calendar');
                    toggle();
                  }}
                />
              </Menu.Item>
              <Menu.Item icon={<IconCircleDotted size={14} />}>
                <NavLink
                  component="a"
                  label="Areas"
                  onClick={() => {
                    navigate('/areas');
                    toggle();
                  }}
                />
              </Menu.Item>
              <Menu.Item icon={<IconLogout size={14} />}>
                <NavLink
                  component="a"
                  label="Logout"
                  onClick={() => {
                    dispatch(logOut({}));
                    /* Will navigate to dashboard then redirect to login screen. If redirect does not occur then logOut payload was unsuccessful */
                    navigate('/dashboard');
                    toggle();
                  }}
                />
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <Menu
            width={260}
            position="bottom-end"
            transition="pop-top-right"
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(
                  classes.user,
                  {
                    [classes.userActive]: userMenuOpened,
                  },
                  'p-2'
                )}
              >
                <Group spacing={7}>
                  <Avatar name={user.name} round size="30" />
                  <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                    {user.name}
                  </Text>
                  <IconChevronDown size={12} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>User</Menu.Label>
              <Menu.Item
                onClick={() => {
                  dispatch(logOut({}));
                  /* Will navigate to dashboard then redirect to login screen. If redirect does not occur then logOut payload was unsuccessful */
                  navigate('/dashboard');
                }}
                icon={<IconLogout size={14} stroke={1.5} />}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
    </div>
  );
}

/* </div>
    <MantineHeader
      withBorder={true}
      height={60}
      mb={120}
      className="z-10 w-full "
    >
      <Group position="apart" spacing={0} className="h-full">
        <Burger opened={opened} onClick={toggle} className="" size="sm" />

        <Menu
          width={260}
          position="bottom-end"
          transition="pop-top-right"
          onClose={() => setUserMenuOpened(false)}
          onOpen={() => setUserMenuOpened(true)}
        >
          <Menu.Target>
            <UnstyledButton className="">
              <Group spacing={7}>
                <Avatar
                  src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
                  alt="Name"
                  radius="xl"
                  size={20}
                />
                <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                  Name
                </Text>
                <IconChevronDown size={12} stroke={1.5} />
              </Group>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item icon={<IconHeart size={14} stroke={1.5} />}>
              Liked posts
            </Menu.Item>
            <Menu.Item icon={<IconStar size={14} stroke={1.5} />}>
              Saved posts
            </Menu.Item>
            <Menu.Item icon={<IconMessage size={14} stroke={1.5} />}>
              Your comments
            </Menu.Item>

            <Menu.Label>Settings</Menu.Label>
            <Menu.Item icon={<IconSettings size={14} stroke={1.5} />}>
              Account settings
            </Menu.Item>
            <Menu.Item icon={<IconSwitchHorizontal size={14} stroke={1.5} />}>
              Change account
            </Menu.Item>
            <Menu.Item icon={<IconLogout size={14} stroke={1.5} />}>
              Logout
            </Menu.Item>

            <Menu.Divider />

            <Menu.Label>Danger zone</Menu.Label>
            <Menu.Item icon={<IconPlayerPause size={14} stroke={1.5} />}>
              Pause subscription
            </Menu.Item>
            <Menu.Item color="red" icon={<IconTrash size={14} stroke={1.5} />}>
              Delete account
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group> */
/* <MediaQuery largerThan="xs" styles={{ placeContent: 'end' }}>
        <Container className="flex items-center h-full w-full">
          <MediaQuery largerThan="xs" styles={{ display: 'none' }}>
            <Group className="justify-between">
              <Burger opened={opened} onClick={toggle} size="sm" />
              <Anchor className="justify-self-end" component={Link} to="/">
                {colorScheme === 'dark' ? (
                  <Image
                    fit="contain"
                    height={40}
                    src={LogoWhite}
                    alt="Valet Logo"
                  />
                ) : (
                  <Image
                    fit="contain"
                    height={40}
                    src={LogoBlue}
                    alt="Valet Logo"
                  />
                )}
              </Anchor>
              <Container className="flex items-end h-full">
                <UserButton
                  image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
                  name="Harriette Spoonlicker"
                  email="hspoonlicker@outlook.com"
                />
              </Container>
            </Group>
          </MediaQuery>
        </Container>
      </MediaQuery> */
