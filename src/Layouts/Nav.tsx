/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import {
  Anchor,
  Center,
  createStyles,
  Image,
  MediaQuery,
  Navbar,
  Stack,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import {
  IconCalendarStats,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconGauge,
  IconHome2,
  IconLogout,
  IconSettings,
  IconSwitchHorizontal,
  IconUser,
  TablerIcon,
} from '@tabler/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Assets/Images/Logo/H-LogoLight.png';
import LightDarkToggleButton from '../Components/Buttons/LightDarkToggleButton';

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 90,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  active?: boolean;
  to: string;
  onClick?(): void;
}

function NavbarLink({
  icon: Icon,
  label,
  active = false,
  to,
  onClick = () => {},
}: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
        component={Link}
        to={to}
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
  { link: '/settings', icon: IconSettings, label: 'Settings' },
];

export default function Nav(colorScheme: any, setColorScheme: any) {
  const [active, setActive] = useState(0);

  const linksList = data.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      to={link.link}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <MediaQuery smallerThan="xs" styles={{ display: 'none' }}>
      <Navbar
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
        <Navbar.Section grow mt={80}>
          <Stack justify="center" spacing={1}>
            {linksList}
          </Stack>
        </Navbar.Section>
        <LightDarkToggleButton />
      </Navbar>
    </MediaQuery>
  );
}
