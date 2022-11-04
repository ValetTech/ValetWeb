// Components
// #region
import {
  Button,
  Card,
  Container,
  Group,
  Select,
  SimpleGrid,
  Title,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useEffect, useState } from 'react';
import CreateReservationModal from '../Forms/CreateReservation';
import ReservationTableStickyHeader from '../Tables/ReservationTableStickyHeader';
// #endregion

// Models
// #region
import Area from '../../Models/Area';
import Reservation from '../../Models/Reservation';
import Sitting from '../../Models/Sitting';
// #endregion

// Services
// #region
import {
  getAreasAsync,
  getReservationByDateAsync,
  getSittingsAsync,
} from '../../Services/ApiServices';
import UserTableStickyHeader from './UserTableStickyHeader';
// #endregion

export default function AdminUserWidget() {
  const userData = [
    {
      key: 1,
      name: 'Paul',
      role: 'Chef',
      phone: '0212345678',
    },
    {
      key: 2,
      name: 'Paul',
      role: 'Chef',
      phone: '0212345678',
    },
    {
      key: 3,
      name: 'Paul',
      role: 'Chef',
      phone: '0212345678',
    },
  ];

  return (
    <Container mt={6}>
      <Card withBorder radius="md">
        <Title size="h4" mb={10}>
          Users
        </Title>
        <UserTableStickyHeader data={userData} />
        <Group mt={20} position="left">
          <Button size="lg">Create</Button>
        </Group>
      </Card>
    </Container>
  );
}
