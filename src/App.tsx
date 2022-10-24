import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import DefaultAppShell from './Layouts/AppShell';
import RoutesController from './Layouts/RoutesController';

export default function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <NotificationsProvider>
          <HashRouter>
            <DefaultAppShell
              colorScheme={colorScheme}
              setColorScheme={setColorScheme}
            />
          </HashRouter>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
