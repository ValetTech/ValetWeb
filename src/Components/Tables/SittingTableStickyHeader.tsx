// Components
// #region
import { createStyles, ScrollArea, Table, UnstyledButton } from '@mantine/core';
import { IconPencil } from '@tabler/icons';
import { useState } from 'react';
import UpdateAreaModal from '../Forms/UpdateAreaModal';
// #endregion

// Services
// #region
import { getAreaByIdAsync } from '../../Services/ApiServices';
// #endregion

// Models
// #region
import Area from '../../Models/Area';
import Reservation from '../../Models/Reservation';
// #endregion

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

interface TableScrollSittingProps {
  data: {
    key: number;
    capacity: number;
    type: string;
    startTime: string;
    endTime: string;
    areas: [Area];
    reservations: [Reservation];
  }[];
}

export default function SittingTableScrollArea({
  data,
}: TableScrollSittingProps) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  //   const [selectedArea, setSelectedArea] = useState();
  //   const [updateAreaModalOpened, setUpdateAreaModalOpened] = useState(false);

  const rows = data.map((row) => (
    <tr key={row.key}>
      <td>{row.key}</td>
      <td>{row.capacity}</td>
      <td>{row.type}</td>
      <td>{row.startTime}</td>
      <td>{row.endTime}</td>
    </tr>
  ));

  return (
    <>
      <ScrollArea
        sx={{ height: 300 }}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table sx={{ minWidth: 350 }}>
          <thead
            className={cx(classes.header, { [classes.scrolled]: scrolled })}
          >
            <tr>
              <th>Id</th>
              <th>Capacity</th>
              <th>Type</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
      {/* <UpdateAreaModal
        areaData={selectedArea}
        opened={updateAreaModalOpened}
        onClose={() => {
          setUpdateAreaModalOpened(false);
        }}
      /> */}
    </>
  );
}
