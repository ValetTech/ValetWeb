import {
  ButtonStylesParams,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { useColorScheme, useHotkeys, useLocalStorage } from '@mantine/hooks';
import { NotificationsProvider } from '@mantine/notifications';
import { StyledEngineProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from './App/store';
import DefaultAppShell from './Layouts/AppShell';

export default function App() {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  // const [value, setValue] = useLocalStorage({
  //   key: 'user-auth',
  //   defaultValue: {},
  // });
  // dispatch(setCredentials({ accessToken: value.accessToken, user: value.use }));

  // const state = store.getState();

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
          theme={{
            colorScheme,
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
                },
                styles: (theme, params: ButtonStylesParams) => ({
                  root: {
                    height: 40,
                    width: 'auto',
                    borderRadius: 12,
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: 'pointer',
                    border: 0,
                    backgroundColor: '#FFB703',
                    color: theme.colorScheme === 'dark' ? '#fff' : '#0F1113',
                    WebkitTapHighlightColor: '###E8B533',
                    boxShadow: '0px 2px 6px 0px #00000024',
                    '&:hover': {
                      backgroundColor: '#ffcc4b',
                    },
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
          withGlobalStyles
          withNormalizeCSS
          withCSSVariables
        >
          <Router>
            <NotificationsProvider>
              <StyledEngineProvider injectFirst>
                <DefaultAppShell
                  store={store}
                  // colorScheme={colorScheme}
                  // setColorScheme={setColorScheme}
                />
              </StyledEngineProvider>
            </NotificationsProvider>
          </Router>
        </MantineProvider>
      </ColorSchemeProvider>
    </Provider>
  );
}
