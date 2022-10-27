/* eslint-disable react/jsx-props-no-spreading */
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
} from '@mantine/core';
import {
  IconBrandAirtable,
  IconCalendarStats,
  IconDeviceDesktopAnalytics,
  IconGauge,
  IconHome2,
  IconSettings,
  TablerIcon,
} from '@tabler/icons';
import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Logo from '../Assets/Images/Logo/H-LogoLight.png';
import ToggleColor from '../Components/Buttons/ToggleColorScheme';

const useStyles = createStyles((theme) => ({
  NavBar: {
    // smallerThan="xs" styles={{ display: 'none' }}
    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      display: 'none',
    },
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

const data = [
  { link: '/', icon: IconHome2, label: 'Dashboard' },
  { link: '/reservations', icon: IconCalendarStats, label: 'Reservations' },
  { link: '/seating', icon: IconDeviceDesktopAnalytics, label: 'Seating' },
  { link: '/orders', icon: IconGauge, label: 'Orders' },
  { link: '/tables', icon: IconBrandAirtable, label: 'Tables' },
  // { link: '/settings', icon: IconSettings, label: 'Settings' },
];

export default function NavbarMinimal() {
  const [active, setActive] = useState(2);
  const { id } = useParams();
  const { pathname } = useLocation();

  console.log(id);

  const { classes } = useStyles();

  const links = data.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={pathname === link.link}
      to={link.link}
      // onClick={() => setActive(index)}
    />
  ));

  return (
    <Container p={0} className={classes.NavBar}>
      <Navbar
        height={750}
        withBorder={false}
        width={{ base: 80 }}
        p="md"
        className="fixed top-0 left-0 z-50 h-full"
      >
        <Center>
          <Anchor component={Link} to="/">
            <Image
              fit="contain"
              height={40}
              //   width={'auto'}
              src={Logo}
              alt="Valet Logo"
            />
          </Anchor>
        </Center>
        <Navbar.Section grow mt={50}>
          <Stack justify="center" spacing={0}>
            {links}
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
