import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { Provider } from 'react-redux';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './App/store';
import DefaultAppShell from './Layouts/AppShell';

export default function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
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
          withGlobalStyles
          withNormalizeCSS
          theme={{ fontFamily: 'Overpass, sans-serif',
          fontFamilyMonospace: 'Overpass, monospace',
          headings: {
            // properties for all headings
            fontWeight: 700,
            fontFamily: 'Overpass, sans-serif',
  
            // properties for individual headings
            sizes: {
              h1: { fontWeight: 700, fontSize: 32, lineHeight: 1.4 },
              h2: { fontSize: 24, lineHeight: 1.5 },
              // ...up to h6
            }
          },
        
        }}
        >
          <Router>
            <NotificationsProvider>
              <DefaultAppShell
                store={store}
                // colorScheme={colorScheme}
                // setColorScheme={setColorScheme}
              />
            </NotificationsProvider>
          </Router>
        </MantineProvider>
      </ColorSchemeProvider>
    </Provider>
  );
}
