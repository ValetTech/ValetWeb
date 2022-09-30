import { Paper, Button, SimpleGrid } from '@mantine/core';
import StatsRing from '../StatGraphics/StatsRing';

export default function VacancyRate() {
  const statsRingMockData = [
    {
      label: 'Vacancy',
      stats: '9999',
      progress: 65,
      color: 'blue',
      icon: 'up',
    },
  ];

  return (
    <Paper mt={6} mb={10}>
      <SimpleGrid cols={2}>
        <StatsRing data={statsRingMockData} />
        <Button>New Reservation</Button>
      </SimpleGrid>
    </Paper>
  );
}
