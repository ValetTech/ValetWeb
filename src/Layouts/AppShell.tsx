import { AppShell, Text, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import Header from './Header';
import Nav from './Nav';

const links = [
  { link: '/', label: 'Home' },
  { link: '/reservations', label: 'Reservations' },
];

export default function DefaultAppShell() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbar={<Nav />}
    >
      <Header links={links} />

      <Text>Resize app to see responsive navbar in action</Text>
    </AppShell>
  );
}
