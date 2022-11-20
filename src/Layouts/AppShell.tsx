import { AppShell } from '@mantine/core';
import {
  IconBoxModel2,
  IconBrandAirtable,
  IconCalendarEvent,
  IconCalendarStats,
  IconHome2,
} from '@tabler/icons';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Nav from './NavBar';
import RoutesController from './RoutesController';

// These are for the header, not the navbar!!
// Navbar links are hardcoded into Nav component for now.

const links = [
  { link: '/dashboard', icon: IconHome2, label: 'Dashboard' },
  { link: '/reservations', icon: IconCalendarStats, label: 'Reservations' },
  { link: '/tables', icon: IconBrandAirtable, label: 'Tables' },
  { link: '/calendar', icon: IconCalendarEvent, label: 'Calendar' },
  { link: '/areas', icon: IconBoxModel2, label: 'Area Designer' },
];

export default function DefaultAppShell(store: any) {
  const { pathname } = useLocation();
  return (
    <AppShell
      padding={0}
      navbarOffsetBreakpoint="xs" // Removes side navbar and fills in space with page content when extra small resolution is reached
      navbar={pathname === '/' ? <div /> : <Nav links={links} />}
      header={pathname === '/' ? <div /> : <Header links={links} />}
    >
      <RoutesController />
    </AppShell>
  );
}
