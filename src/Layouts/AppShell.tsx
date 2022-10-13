import { AppShell, Text, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import Header from './Header';
import Nav from './Nav';
import Dashboard from '../Pages/Dashboard';
import RoutesController from './RoutesController';

const links = [
  { link: '/', label: 'Home' },
  { link: '/reservations', label: 'Reservations' },
  { link: '/settings', label: 'Settings' },
];

export default function DefaultAppShell() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="xs" // Removes side navbar and fills in space with page content when extra small resolution is reached
      navbar={<Nav />}
      header={<Header links={links} />}
    >
      {/* content */}
      <RoutesController />
    </AppShell>
  );
}
