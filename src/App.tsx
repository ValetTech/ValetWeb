import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { HashRouter } from 'react-router-dom';
import DefaultAppShell from './Layouts/AppShell';
import RoutesController from './Layouts/RoutesController';

export default function App() {
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
