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
// #endregion

export default function DashboardReservationWidget() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [areaData, setAreaData] = useState<Area[]>([]);
  const [sittingData, setSittingData] = useState<Sitting[]>([]);
  const [reservationData, setReservationData] = useState<Reservation[]>([]);
  const [createModalOpened, setCreateModalOpened] = useState(false);

  function onCloseCreateModal() {
    setCreateModalOpened(false);
  }

  useEffect(() => {
    async function fetchAreas() {
      const res: Area[] = await getAreasAsync();
      setAreaData(res);
    }
    fetchAreas();
    async function fetchSittings() {
      const res: Sitting[] = await getSittingsAsync();
      setSittingData(res);
    }
    fetchSittings();
  }, []);

  useEffect(() => {
    // Formatting date for url query. For some reason getMonth returns an incorrect number (e.g. october is 9) so have to do + 1.
    const formattedDate = `${selectedDate.getFullYear()}-${
      // eslint-disable-next-line prettier/prettier
      selectedDate.getMonth() + 1
    }-${selectedDate.getDate()}`;

    async function fetchReservations() {
      const res: Reservation[] = await getReservationByDateAsync(formattedDate);
      setReservationData(res);
    }
    fetchReservations();
  }, [selectedDate]);

  // Mapping the data so that it can be displayed in <Select> component.
  // Name of sitting will be displayed in select, but it will return the ID number.
  const sittings = sittingData.map((s) => ({
    label: s.type,
    value: s.id,
  }));
  // Name of area will be displayed in select, but it will return the ID number.
  const areas = areaData.map((a) => ({
    label: a.name,
    value: a.id,
  }));
  // Mapping reservation data for table
  const reservations = reservationData.map((r) => ({
    key: r.id,
    name: r.customer.fullName,
    phone: r.customer.phone,
    dateTime: r.dateTime,
  }));

  return (
    <Container mt={6}>
      <Card withBorder radius="md">
        <Title size="h4" mb={10}>
          Reservations
        </Title>
        <DatePicker
          dropdownType="modal"
          placeholder="Pick date"
          value={selectedDate}
          onChange={(value) => setSelectedDate(value || new Date())}
        />
        <SimpleGrid cols={2} mb={30}>
          <Title size="h4" mt={30} mb={10}>
            Filter by area
            <Select data={areas} />
          </Title>
          <Title size="h4" mt={30} mb={10}>
            Filter by sitting
            <Select data={sittings} />
          </Title>
        </SimpleGrid>
        <ReservationTableStickyHeader
          data={reservations}
          sittingData={sittingData}
          areaData={areas}
        />
        <Group mt={20} position="left">
          <Button size="lg" onClick={() => setCreateModalOpened(true)}>
            Create
          </Button>
          <CreateReservationModal
            areaData={areaData}
            sittingData={sittingData}
            opened={createModalOpened}
            onClose={() => onCloseCreateModal()}
          />
        </Group>
      </Card>
    </Container>
  );
}
