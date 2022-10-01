// Components
import { useState } from 'react';
import {
  createStyles,
  Table,
  ScrollArea,
  Button,
  UnstyledButton,
  Group,
  SimpleGrid,
  Drawer,
} from '@mantine/core';
import { IconChevronRight, IconPencil } from '@tabler/icons';

// Services
import { getReservationByIdAsync } from '../../Services/ApiServices';

// Interfaces
import Reservation from '../../Services/ApiInterfaces';

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

interface TableScrollAreaProps {
  data: { id: number; fullName: string; phone: string; dateTime: string }[];
}

export default function TableScrollArea({ data }: TableScrollAreaProps) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpened, setDrawerOpened] = useState(false);

  const rows = data.map((row) => (
    <tr key={row.fullName}>
      <td>{row.fullName}</td>
      <td>{row.phone}</td>
      <td>
        {row.dateTime}
        <UnstyledButton pl={20}>
          <IconPencil
            size={20}
            stroke={1.5}
            onClick={() => setDrawerOpened(true)}
          />
        </UnstyledButton>
        <Drawer
          opened={drawerOpened}
          onClose={() => setDrawerOpened(false)}
          title="Reservation"
          padding="xl"
          size="full"
          position="top"
        >
          {/* Drawer Content */}
        </Drawer>
      </td>
    </tr>
  ));

  return (
    <ScrollArea
      sx={{ height: 300 }}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table sx={{ minWidth: 350 }} highlightOnHover fontSize="lg">
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
