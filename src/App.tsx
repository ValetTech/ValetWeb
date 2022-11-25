import {
  ButtonStylesParams,
  ColorScheme,
  ColorSchemeProvider,
  Global,
  MantineProvider,
} from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './App/store';
import './index.css';
import DefaultAppShell from './Layouts/AppShell';

function MyGlobalStyles() {
  return (
    <Global
      styles={(theme) => ({
        body: {
          backgroundColor: theme.colorScheme === 'dark' ? '#141517' : '#f1f4f8',
        },
        // 'button, [type="button"], [type="reset"], [type="submit"]': {
        //   background: '#ffcc4b',
        // },
        // backgroundColor: theme.colorScheme === 'dark' ? '#0d1117' : '#f1f4f8',
        // ...other global styles
      })}
    />
  );
}
export default function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  //   -webkit-tap-highlight-color: #E8B533;
  // background-color: #E8B533;
  // border-radius: 12px;
  // color: #0F1113;
  // border: 0px;

  return (
    <Provider store={store}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          withCSSVariables
          theme={{
            colorScheme,
            fontFamily: 'Overpass, Inter, sans-serif',
            fontFamilyMonospace: 'Overpass Mono, Menlo, monospace',
            headings: {
              fontFamily: 'Overpass, Inter, sans-serif',
            },

            colors: {
              brand: [
                '#F0BBDD',
                '#ED9BCF',
                '#EC7CC3',
                '#ED5DB8',
                '#F13EAF',
                '#F71FA7',
                '#FF00A1',
                '#E00890',
                '#C50E82',
                '#AD1374',
              ],
            },

            // primaryColor: 'brand',
            components: {
              Button: {
                defaultProps: {
                  // size: 'xs',
                  // color: 'cyan',
                  // backgroundColor: '#FFB703',
                  background: '#FFB703',

                  color: '#FFB703',
                },
                styles: (theme, params: ButtonStylesParams) => ({
                  root: {
                    // '*, *:before, *:after': { backgroundColor: '#FFB703' },
                    height: 40,
                    width: 'auto',
                    borderRadius: 12,
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: 'pointer',
                    border: 0,
                    backgroundColor: '#ffcc4b',
                    background: '#FFB703',

                    color: theme.colorScheme === 'dark' ? '#fff' : '#0F1113',
                    WebkitTapHighlightColor: '###E8B533',
                    boxShadow: '0px 2px 6px 0px #00000024',
                    '&:hover': {
                      backgroundColor: '#ffcc4b',
                    },

                    // backgroundColor: '#FFB703',
                  },
                }),
              },

              A: {
                styles: (theme) => ({
                  root: {
                    color: theme.colorScheme === 'dark' ? '#fff' : '#0F1113',
                    WebkitTapHighlightColor: '#E8B533',
                    borderRadius: 12,
                    border: 0,
                  },
                }),
              },
            },
          }}
        >
          <MyGlobalStyles />
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
