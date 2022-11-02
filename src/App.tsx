import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import DefaultAppShell from './Layouts/AppShell';

export default function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <Provider store={store}>
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
    </Provider>
  );
}
