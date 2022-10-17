// Lint Rules
// #region
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
// #endregion

// Components
// #region
import { Drawer, Text } from '@mantine/core';
import { useState } from 'react';
import UpdateReservationModal from './UpdateReservationModal';
// #endregion
// #endregion

// Models
// #region
import Reservation from '../../Models/Reservation';
import Sitting from '../../Models/Sitting';
// #endregion

interface ReservationDetailsDrawerProps {
  opened: boolean;
  onClose(): void;
  sittingData: Sitting[];
  reservationData: Reservation;
}

export default function ReservationDetailsDrawer({
  opened,
  onClose,
  sittingData,
  reservationData,
}: ReservationDetailsDrawerProps) {
  const [UpdateReservationModalOpened, setUpdateReservationModalOpened] =
    useState(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => {
          onClose();
        }}
      >
        <Text>Reservation Details</Text>

        <Text>{reservationData?.duration}</Text>
      </Drawer>
      <UpdateReservationModal
        opened={UpdateReservationModalOpened}
        onClose={() => setUpdateReservationModalOpened(false)}
        sittingData={sittingData}
      />
    </>
  );
}
