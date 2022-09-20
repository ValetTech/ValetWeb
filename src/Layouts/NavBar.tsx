import { Navbar, Text } from '@mantine/core';
import { useState } from 'react';

interface NavProps {
  links: { link: string; label: string }[];
}

export default function NavBar({ links }: NavProps) {
  const [opened, setOpened] = useState(false);

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="xs"
      hidden={!opened}
      className="w-16 sm:w-12 md:w-24 lg:w-64 absolute top-0 h-full"
    >
      <Text>Nav bar</Text>
    </Navbar>
  );
}
