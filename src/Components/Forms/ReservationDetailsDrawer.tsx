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
  Group,
  List,
  Modal,
  SimpleGrid,
  Text,
  Title,
} from '@mantine/core';
import { useState } from 'react';
import { IconCircleDotted } from '@tabler/icons';
import UpdateReservationModal from './UpdateReservationModal';
// #endregion
// #endregion

// Services
// #region
import { deleteReservationAsync } from '../../Services/ApiServices';
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
  const [updateReservationModalOpened, setUpdateReservationModalOpened] =
    useState(false);
  const [deleteReservationModalOpened, setDeleteReservationModalOpened] =
    useState(false);

  return (
    <>
      <Drawer
        padding="xl"
        size="full"
        position="top"
        opened={opened}
        onClose={() => {
          onClose();
        }}
      >
        <Card withBorder radius="md">
          <Title align="center">Update Reservation</Title>
          <Group position="center">
            <List
              mt={40}
              mr={180}
              spacing="md"
              size="lg"
              center
              icon={<IconCircleDotted />}
            >
              <List.Item>
                <Title size="h4">First Name:</Title>
              </List.Item>
              <Text italic ml={40} mb={20}>
                {reservationData?.customer.firstName}
              </Text>
              <List.Item>
                <Title size="h4">Last Name:</Title>
              </List.Item>
              <Text italic ml={40} mb={20}>
                {reservationData?.customer.lastName}
              </Text>
              <List.Item>
                <Title size="h4">Phone:</Title>
              </List.Item>
              <Text italic ml={40} mb={20}>
                {reservationData?.customer.phone}
              </Text>
              <List.Item>
                <Title size="h4">Booking Time:</Title>
              </List.Item>
              <Text italic ml={40} mb={20}>
                {reservationData?.dateTime}
              </Text>
              <List.Item>
                <Title size="h4">Duration:</Title>
              </List.Item>
              <Text italic ml={40} mb={20}>
                {reservationData?.duration} minutes
              </Text>
              <List.Item>
                <Title size="h4">Number of guests</Title>
              </List.Item>
              <Text italic ml={40} mb={20}>
                {reservationData?.noGuests} covers
              </Text>
              <List.Item>
                <Title size="h4">Notes</Title>
              </List.Item>
              <Text italic ml={40} mb={20}>
                {reservationData?.notes}
              </Text>
              <List.Item>
                <Title size="h4">VIP?</Title>
              </List.Item>
              <Text italic ml={40} mb={20}>
                {reservationData?.customer.isVip.toString().toUpperCase()}
              </Text>
            </List>
          </Group>
          <Group mt={20} position="center">
            <SimpleGrid cols={2}>
              <Button
                size="lg"
                onClick={() => {
                  setUpdateReservationModalOpened(true);
                }}
              >
                Update
              </Button>
              <Button
                color="red"
                size="lg"
                onClick={() => setDeleteReservationModalOpened(true)}
              >
                Delete
              </Button>
              {/* Delete Confirmation Modal */}
              <Modal
                centered
                opened={deleteReservationModalOpened}
                onClose={() => setDeleteReservationModalOpened(false)}
              >
                <Group position="center">
                  <Title size="h3">{reservationData?.customer.fullName}</Title>
                  <Text italic size="lg">
                    Are you sure you want to delete this reservation?
                  </Text>
                  <SimpleGrid cols={2}>
                    <Button
                      size="lg"
                      color="red"
                      onClick={() => {
                        deleteReservationAsync(reservationData?.id);
                        setDeleteReservationModalOpened(false);
                        onClose();
                      }}
                    >
                      Confirm
                    </Button>
                    <Button
                      size="lg"
                      onClick={() => setDeleteReservationModalOpened(false)}
                    >
                      Cancel
                    </Button>
                  </SimpleGrid>
                </Group>
              </Modal>
            </SimpleGrid>
          </Group>
        </Card>
      </Drawer>
      <UpdateReservationModal
        opened={updateReservationModalOpened}
        onClose={() => setUpdateReservationModalOpened(false)}
        sittingData={sittingData}
        reservationData={reservationData}
      />
    </>
  );
}
