// Components
import { SimpleGrid, Container, Card, Title, Select } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useState, useEffect } from 'react';
import TableStickyHeader from './TableStickyHeader';

// Services
import {
  getReservationByDateAsync,
  getAllAreasAsync,
  getSittingsAsync,
} from '../../Services/ApiServices';

// Data Models
import Reservation from '../../Models/Reservation';
import Area from '../../Models/Area';
import Sitting from '../../Models/Sitting';

export default function DashboardReservationList() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reservationData, setReservationData] = useState([]);
  const [areaData, setAreaData] = useState([]);
  const [sittingData, setSittingData] = useState([]);

  // Will fire whenever selected date changes
  useEffect(() => {
    // Formatting date for url query. For some reason getMonth returns an incorrect number (e.g. october is 9) so have to do + 1.
    const formattedDate = `${selectedDate.getFullYear()}-${
      // eslint-disable-next-line prettier/prettier
      (selectedDate.getMonth() + 1)
    }-${selectedDate.getDate()}`;

    getReservationByDateAsync(formattedDate).then((response) => {
      const reservations: Array<Reservation> = response.data;
      // Deconstructing response and building new array to pass to table component
      // Errors are being thrown but they do not seem to be causing any issues
      const dataBuilder = [];
      reservations.forEach((element) => {
        dataBuilder.push({
          id: element.id,
          fullName: element.customer.fullName,
          phone: element.customer.phone,
          dateTime: element.dateTime,
        });
      });
      setReservationData(dataBuilder);
      console.log(reservationData);
    });
  }, [selectedDate]);

  // Will only fire on page load
  useEffect(() => {
    getAllAreasAsync().then((response) => {
      const areas: Array<Area> = response.data;
      const dataBuilder = [];
      areas.forEach((element) => {
        dataBuilder.push({
          label: element.name,
          value: element.name,
          description: element.description,
        });
      });
      setAreaData(dataBuilder);
      console.log(areaData);
    });
  }, []);

  // Will only fire on page load
  useEffect(() => {
    getSittingsAsync().then((response) => {
      const sittings: Array<Sitting> = response.data;
      const dataBuilder = [];
      sittings.forEach((element) => {
        dataBuilder.push({
          label: element.type,
          value: element.type,
          id: element.id,
          venueId: element.venueId,
        });
      });
      setSittingData(dataBuilder);
      console.log(sittingData);
    });
  }, []);

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
          // onChange throws an error but doesn't seem to be causing any issues.
          onChange={setSelectedDate}
        />
        <SimpleGrid cols={2} mb={30}>
          <Title size="h4" mt={30} mb={10}>
            Filter by area
            <Select data={areaData} />
          </Title>
          <Title size="h4" mt={30} mb={10}>
            Filter by sitting
            <Select data={sittingData} />
          </Title>
        </SimpleGrid>
        <TableStickyHeader
          reservationData={reservationData}
          sittingData={sittingData}
        />
      </Card>
    </Container>
  );
}
