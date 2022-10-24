import { AppShell, Text, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import Header from './Header';
import Nav from './Nav';
import Dashboard from '../Pages/Dashboard';
import RoutesController from './RoutesController';

// These are for the header, not the navbar!!
// Navbar links are hardcoded into Nav component for now.
const links = [{ link: '/', label: 'placeholder' }];

export default function DefaultAppShell(colorScheme: any, setColorScheme: any) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={colorScheme}
      navbarOffsetBreakpoint="xs" // Removes side navbar and fills in space with page content when extra small resolution is reached
      navbar={<Nav colorScheme={colorScheme} setColorScheme={setColorScheme} />}
      header={<Header links={links} />}
    >
      {/* content */}
      <RoutesController />
    </AppShell>
  );
}
