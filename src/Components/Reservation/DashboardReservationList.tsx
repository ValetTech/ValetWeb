import { SimpleGrid, Container, Card, Title, Button } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import TableStickyHeader from '../Tables/TableStickyHeader';

export default function DashboardReservationList() {
  const mockData = [
    { name: 'John Smith', phone: '123456789', time: '9:30' },
    { name: 'John Smith', phone: '123456789', time: '9:30' },
    { name: 'John Smith', phone: '123456789', time: '9:30' },
    { name: 'John Smith', phone: '123456789', time: '9:30' },
    { name: 'John Smith', phone: '123456789', time: '9:30' },
    { name: 'John Smith', phone: '123456789', time: '9:30' },
    { name: 'John Smith', phone: '123456789', time: '9:30' },
    { name: 'John Smith', phone: '123456789', time: '9:30' },
    { name: 'John Smith', phone: '123456789', time: '9:30' },
  ];

  return (
    <Container mt={6}>
      <Card withBorder radius="md">
        <Title size="h4" mb={10}>
          Reservations
        </Title>
        <DatePicker dropdownType="modal" placeholder="Pick date" />
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
        <TableStickyHeader data={mockData} />
      </Card>
    </Container>
  );
}
