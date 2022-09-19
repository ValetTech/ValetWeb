import { AppShell, Container, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import Footer from '../Layouts/Footer';
import Header from '../Layouts/Header';
import Navbar from '../Layouts/NavBar';
import RoutesController from '../Layouts/RoutesController';

interface AppShellProps {
  links: { link: string; label: string }[];
}

export default function AppShellLayout({ links }: AppShellProps) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      header={<Header links={links} />}
      navbar={<Navbar links={links} />}
      footer={<Footer links={links} />}
    >
      <Container>
        <RoutesController />
      </Container>
    </AppShell>
  );
}
