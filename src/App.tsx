import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { HashRouter } from 'react-router-dom';
import DefaultAppShell from './Layouts/AppShell';

export default function App() {
  const links = [
    { link: '/', label: 'Home' },
    { link: '/reservations', label: 'Reservations' },
  ];

  return (
    <MantineProvider
      theme={{ colorScheme: 'dark' }}
      withGlobalStyles
      withNormalizeCSS
    >
      <NotificationsProvider>
        <HashRouter>
          <DefaultAppShell />
        </HashRouter>
      </NotificationsProvider>
    </MantineProvider>
  );
}
