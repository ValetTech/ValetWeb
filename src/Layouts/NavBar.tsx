import {
  Anchor,
  Center,
  Container,
  createStyles,
  Image,
  Navbar,
  Stack,
  Tooltip,
  UnstyledButton,
  useMantineColorScheme,
} from '@mantine/core';
import { IconSettings, TablerIcon } from '@tabler/icons';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LogoBlack from '../Assets/Images/Logo/H-LogoBlack.png';
import LogoWhite from '../Assets/Images/Logo/H-LogoWhite.png';
import ToggleColor from '../Components/Buttons/ToggleColorScheme';

const useStyles = createStyles((theme) => ({
  NavBar: {
    // smallerThan="xs" styles={{ display: 'none' }}
    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      display: 'none',
    },
    borderRight: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    // theme.colorScheme === 'dark'
    //   ? theme.colors.dark[6]
    //   : theme.colors.gray[0],
  },

  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px 0',
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      margin: '5px 0',
    },
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
        .color,
    },
  },
}));

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  active: boolean;
  to: string;
  // onClick: () => void;
}

function NavbarLink({
  icon: Icon,
  label,
  to = '/',
  active = false,
}: // onClick = () => {},
NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton
        component={Link}
        to={to}
        // onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

interface NavbarProps {
  links: {
    icon: TablerIcon;
    label: string;
    link: string;
  }[];
}

export default function Nav({ links }: NavbarProps) {
  const { pathname } = useLocation();
  // const colorScheme = useColorScheme();
  const { colorScheme } = useMantineColorScheme();
  const { classes, cx } = useStyles();

  useEffect(() => {}, [colorScheme]);

  const linksList = links.map((link) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={pathname === link.link}
      to={link.link}
    />
  ));

  return (
    <Container p={0} className={classes.NavBar}>
      <Navbar
        height={750}
        withBorder={false}
        width={{ base: 80 }}
        p="md"
        className={cx('fixed top-0 left-0 z-50 h-full', classes.NavBar)}
      >
        <Center>
          <Anchor component={Link} to="/">
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
                src={LogoBlack}
                alt="Valet Logo"
              />
            )}
          </Anchor>
        </Center>
        <Navbar.Section grow mt={50}>
          <Stack justify="center" spacing={0}>
            {linksList}
          </Stack>
        </Navbar.Section>
        <Navbar.Section>
          <Stack justify="center" spacing={0}>
            <NavbarLink
              // onClick={setActive}
              label="Settings"
              icon={IconSettings}
              to="/settings"
              active={pathname === '/settings'}
            />
            <ToggleColor />
          </Stack>
        </Navbar.Section>
      </Navbar>
    </Container>
  );
}
