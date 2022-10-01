// Components
import { SimpleGrid, Container, Card, Title, Button } from '@mantine/core';
import { DatePicker, DateRangePickerValue } from '@mantine/dates';
import { useState, useEffect, useRef } from 'react';
import TableStickyHeader from '../Tables/TableStickyHeader';

// Services
import { getReservationByDateAsync } from '../../Services/ApiServices';

// Interfaces
import Reservation from '../../Services/ApiInterfaces';

export default function DashboardReservationList() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reservationData, setReservationData] = useState([]);

  useEffect(() => {
    // Formatting date for url query. For some reason getMonth returns an incorrect number (e.g. october is 9) so have to do + 1.
    const formattedDate = `${selectedDate.getFullYear()}-${
      // eslint-disable-next-line prettier/prettier
      (selectedDate.getMonth() + 1)
    }-${selectedDate.getDate()}`;

    getReservationByDateAsync(formattedDate).then((response) => {
      // Using Reservation Interfacer in services/ApiInterfaces to type api response
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
        <Title size="h6" mt={30}>
          Filter by area
        </Title>
        <SimpleGrid cols={3}>
          <Button>Main</Button>
          <Button>Outside</Button>
          <Button>Upstairs</Button>
        </SimpleGrid>
        <Title size="h6" mt={15}>
          Filter by sitting
        </Title>
        <SimpleGrid cols={3} mb={20}>
          <Button>Breakfast</Button>
          <Button>Lunch</Button>
          <Button>Dinner</Button>
        </SimpleGrid>
        <TableStickyHeader data={reservationData} />
      </Card>
    </Container>
  );
}
