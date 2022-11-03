import { AppShell } from '@mantine/core';
import {
  IconBoxModel2,
  IconBrandAirtable,
  IconCalendarEvent,
  IconCalendarStats,
  IconDeviceDesktopAnalytics,
  IconGauge,
  IconHome2,
} from '@tabler/icons';
import Header from './Header';
import Nav from './NavBar';
import RoutesController from './RoutesController';

// These are for the header, not the navbar!!
// Navbar links are hardcoded into Nav component for now.

const links = [
  { link: '/', icon: IconHome2, label: 'Dashboard' },
  { link: '/reservations', icon: IconCalendarStats, label: 'Reservations' },
  { link: '/seating', icon: IconDeviceDesktopAnalytics, label: 'Seating' },
  { link: '/orders', icon: IconGauge, label: 'Orders' },
  { link: '/tables', icon: IconBrandAirtable, label: 'Tables' },
  { link: '/calendar', icon: IconCalendarEvent, label: 'Calendar' },
  { link: '/areas', icon: IconBoxModel2, label: 'Area Designer' },
];

export default function DefaultAppShell() {
  return (
    <AppShell
      padding={0}
      navbarOffsetBreakpoint="xs" // Removes side navbar and fills in space with page content when extra small resolution is reached
      navbar={<Nav links={links} />}
      header={<Header links={links} />}
    >
      <RoutesController />
    </AppShell>
  );
}
