import { MantineProvider } from '@mantine/core';
import { HashRouter, Route, Routes } from 'react-router-dom';
import FooterCentered from './Layouts/Footer';
import HeaderSimple from './Layouts/Header';
import AppPage from './Pages/AppPage';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import Reservations from './Pages/Reservations';

// connection.start().catch((err) => document.write(err));

export default function App() {
  const links = [
    { link: '/', label: 'Home' },
    { link: '/app', label: 'App' },
    { link: '/reservations', label: 'Reservations' },
  ];

  return (
    <MantineProvider
      theme={{ colorScheme: 'dark' }}
      withGlobalStyles
      withNormalizeCSS
    >
      {/* <RoutesController/> */}
      <HashRouter>
        <HeaderSimple links={links} />
        <Routes>
          <Route path="/app" element={<AppPage />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <FooterCentered links={links} />
      </HashRouter>
    </MantineProvider>
  );
}
