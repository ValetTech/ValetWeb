/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Anchor,
  Burger,
  Button,
  Container,
  createStyles,
  Group,
  Image,
  Menu,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import {
  IconChevronDown,
  IconLogin,
  IconLogout,
  TablerIcon,
} from '@tabler/icons';
import { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { store } from '../App/store';
import LogoWhite from '../Assets/Images/Logo/H-LogoWhite.png';
import LoginModal from '../Components/Login/LoginModal';
import { logOut, selectCurrentUser } from '../Features/Auth/authSlice';
// import UserButton from '../Components/User/UserButton';

interface HeaderSimpleProps {
  links: { link: string; icon: TablerIcon; label: string }[];
}

const useStyles = createStyles((theme) => ({
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

interface NavbarProps {
  links: {
    icon: TablerIcon;
    label: string;
    link: string;
  }[];
}

export default function Header({ links }: HeaderSimpleProps) {
  const { classes, theme, cx } = useStyles();
  const { pathname } = useLocation();

  const selectedUser = useSelector(selectCurrentUser);
  const [user, setUser] = useState(selectedUser);
  const [loginModalOpened, setLoginModalOpened] = useState(false);
  const [navOpened, setNavOpened] = useState(false);
  const ref = useClickOutside(() => setNavOpened(false));
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const state = store.getState();

  useEffect(() => {
    setUser(state.auth.user);
  }, [state]);

  const handleLogout = () => {
    dispatch(logOut({}));
    navigate('/home');
    setNavOpened(false);
  };

  return (
    <div className="bg-[#023047] xs:bg-transparent border-none rounded-b-md ">
      <Container className="py-2">
        {/* <Group position="right"> */}
        <Group className="justify-between xs:justify-end">
          <Anchor component={Link} to="/dashboard" className="xs:hidden">
            <Image fit="contain" height={40} src={LogoWhite} alt="Valet Logo" />
          </Anchor>

          <Menu
            opened={navOpened}
            shadow="md"
            width={200}
            transition="pop-top-right"
          >
            <Menu.Target>
              <Burger
                opened={navOpened}
                onClick={() => setNavOpened(!navOpened)}
                className={classes.burger}
                size="sm"
                color="#8B97A2"
              />
            </Menu.Target>

            <Menu.Dropdown>
              <div ref={ref}>
                <Menu.Label>Navigation</Menu.Label>
                {links.map((link) => (
                  <Menu.Item
                    key={link.label}
                    icon={<link.icon size={16} color="#8B97A2" stroke={1.5} />}
                    onClick={() => {
                      navigate(link.link);
                      setNavOpened(false);
                    }}
                    color={
                      pathname === link.link
                        ? theme.colors.blue[6]
                        : theme.colorScheme === 'dark'
                        ? theme.colors.dark[0]
                        : theme.black
                    }
                  >
                    {link.label}
                  </Menu.Item>
                ))}
                <Menu.Divider />
                <Menu.Item
                  icon={<IconLogout size={14} color="#8B97A2" />}
                  onClick={() => {
                    handleLogout();
                    setNavOpened(false);
                  }}
                  color="red"
                >
                  Logout
                </Menu.Item>
              </div>
            </Menu.Dropdown>
          </Menu>
          {user ? (
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
                    'p-2 hover:bg-[#FFB703] rounded-lg'
                  )}
                >
                  <Group spacing={7}>
                    <Avatar name={user} round size="30" />
                    <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                      {user}
                    </Text>
                    <IconChevronDown size={12} stroke={1.5} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown className=" shadow-xl rounded-lg">
                <Menu.Label>{user}</Menu.Label>
                <Menu.Item
                  onClick={handleLogout}
                  icon={<IconLogout size={14} stroke={1.5} />}
                  className="hover:bg-[#FFB703] rounded-lg"
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Button
              variant="outline"
              leftIcon={<IconLogin size={20} />}
              className={cx(
                classes.user,
                {
                  [classes.userActive]: userMenuOpened,
                },
                'p-2  hover:bg-[#FFB703] rounded-lg'
              )}
              onClick={() => setLoginModalOpened(true)}
            >
              Sign in
            </Button>
          )}
        </Group>
      </Container>
      <LoginModal
        modalOpened={loginModalOpened}
        setModalOpened={setLoginModalOpened}
      />
    </div>
  );
}
