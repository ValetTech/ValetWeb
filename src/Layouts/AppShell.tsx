import { AppShell, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import Header from './Header';
import NavbarMinimal from './NavBar';
import RoutesController from './RoutesController';

// These are for the header, not the navbar!!
// Navbar links are hardcoded into Nav component for now.
const links = [{ link: '/', label: 'placeholder' }];

export default function DefaultAppShell() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      padding={0}
      navbarOffsetBreakpoint="xs" // Removes side navbar and fills in space with page content when extra small resolution is reached
      navbar={<NavbarMinimal />}
      // navbar={<Nav colorScheme={colorScheme} setColorScheme={setColorScheme} />}
      header={<Header links={links} />}
    >
      {/* content */}
      <RoutesController />
    </AppShell>
  );
}
