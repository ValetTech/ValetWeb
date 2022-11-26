import { AppShell } from '@mantine/core';
import { useScrollLock, useWindowScroll } from '@mantine/hooks';
import {
  IconBoxModel2,
  IconBrandAirtable,
  IconCalendarEvent,
  IconCalendarStats,
  IconHome2,
} from '@tabler/icons';
import { useEffect } from 'react';
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
  { link: '/areas', icon: IconBoxModel2, label: 'Areas' },
];

export default function DefaultAppShell(store: any) {
  const { pathname } = useLocation();
  const [scroll, scrollTo] = useWindowScroll();
  const [_, setScrollLocked] = useScrollLock();
  const lockedPaths = ['/areas', '/calendar', '/', '/settings'];
  const noNavPaths = ['/', '/sake'];

  useEffect(() => {
    scrollTo({ x: 0, y: 0 });
    setScrollLocked(lockedPaths.includes(pathname) && scroll.y === 0);
  }, [pathname]);

  return (
    <AppShell
      padding={0}
      navbarOffsetBreakpoint="xs" // Removes side navbar and fills in space with page content when extra small resolution is reached
      navbar={noNavPaths.includes(pathname) ? <div /> : <Nav links={links} />}
      header={
        noNavPaths.includes(pathname) ? <div /> : <Header links={links} />
      }
    >
      <RoutesController />
    </AppShell>
  );
}
