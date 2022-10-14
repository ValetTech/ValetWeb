// Components
// #region
import { Card, Container, Select, SimpleGrid, Title } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useState, useEffect } from 'react';
import ReservationTableStickyHeader from '../Tables/ReservationTableStickyHeader';
// #endregion

// Models
// #region
import Area from '../../Models/Area';
import Sitting from '../../Models/Sitting';
// #endregion

// Services
// #region
import { getAreasAsync, getSittingsAsync } from '../../Services/ApiServices';
// #endregion

export default function DashboardReservationWidget() {
  const [areaData, setAreaData] = useState([]);
  const [sittingData, setSittingData] = useState([]);

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

  // Mapping the data so that it can be displayed in <Select> component.
  // Name of sitting will be displayed in select, but it will return the ID number.
  const sittings: { label: string; value: number }[] = sittingData.map((s) => ({
    label: s.type,
    value: s.id,
  }));
  // Name of area will be displayed in select, but it will return the ID number.
  const areas: { label: string; value: number }[] = areaData.map((a) => ({
    label: a.name,
    value: a.id,
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
          // onChange throws an error but doesn't seem to be causing any issues.
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
          data={[
            {
              name: 'Paul',
              email: 'p.b@gmail.com',
              company: 'valet',
            },
          ]}
        />
      </Card>
    </Container>
  );
}
