// Components
// #region
import { createStyles, ScrollArea, Table, UnstyledButton } from '@mantine/core';
import { IconPencil } from '@tabler/icons';
import { useState } from 'react';
import ReservationDetailsDrawer from '../Forms/ReservationDetailsDrawer';
// #endregion

// Services
// #region
import { getReservationByIdAsync } from '../../Services/ApiServices';
// #endregion

// Models
// #region
import Reservation from '../../Models/Reservation';
import Sitting from '../../Models/Sitting';
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

interface TableScrollAreaProps {
  data: { key: number; name: string; phone: string; dateTime: string }[];
  sittingData: Sitting[];
}

export default function ReservationTableScrollArea({
  data,
  sittingData,
}: TableScrollAreaProps) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const [detailsDrawerOpened, setDetailsDrawerOpened] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation>();

  const rows = data.map((row) => (
    <tr key={row.key}>
      <td>{row.name}</td>
      <td>{row.phone}</td>
      <td>{row.dateTime}</td>
      <td>
        {/* Edit Button */}
        <UnstyledButton pl={20}>
          <IconPencil
            size={20}
            stroke={1.5}
            onClick={() => {
              // Reservation ID is assigned as row key, so it is ok to use here for API call.
              getReservationByIdAsync(row.key)
                .then((response) => {
                  setSelectedReservation(response);
                })
                .then(() => {
                  setDetailsDrawerOpened(true);
                });
            }}
          />
        </UnstyledButton>
      </td>
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
              <th>Name</th>
              <th>Phone</th>
              <th>Time</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
      <ReservationDetailsDrawer
        sittingData={sittingData}
        reservationData={selectedReservation}
        opened={detailsDrawerOpened}
        onClose={() => {
          setDetailsDrawerOpened(false);
        }}
      />
    </>
  );
}
