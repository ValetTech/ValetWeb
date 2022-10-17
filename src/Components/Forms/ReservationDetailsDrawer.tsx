// Lint Rules
// #region
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
// #endregion

// Components
// #region
import {
  Button,
  Card,
  Drawer,
  Text,
  Group,
  List,
  Modal,
  NumberInput,
  Select,
  SimpleGrid,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useState, useEffect } from 'react';
import { DatePicker, TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconPencil } from '@tabler/icons';
import UpdateReservationModal from './UpdateReservationModal';
// #endregion

// Services
// #region
import { getReservationByIdAsync } from '../../Services/ApiServices';
// #endregion

// Models
// #region
import Reservation from '../../Models/Reservation';
import Customer from '../../Models/Customer';
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
      />
      {/* <Text>{reservationData.duration}</Text> */}
      <UpdateReservationModal
        opened={UpdateReservationModalOpened}
        onClose={() => setUpdateReservationModalOpened(false)}
        sittingData={sittingData}
      />
    </>
  );
}
