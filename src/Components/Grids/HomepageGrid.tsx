// https://ui.mantine.dev/category/stats

import { SimpleGrid, Skeleton, Text, Group } from '@mantine/core';
import DashboardReservationList from '../Reservation/DashboardReservationList';
import VacancyRate from '../Widgets/VacancyRate';

export default function HomepageGrid() {
  return (
    // Breakpoints prop handles responsivity.
    <SimpleGrid
      cols={2}
      breakpoints={[
        { maxWidth: 'xs', cols: 1 },
        { maxWidth: 'sm', cols: 1 },
        { maxWidth: 'md', cols: 2 },
        { maxWidth: 'lg', cols: 2 },
        { maxWidth: 'xl', cols: 2 },
      ]}
    >
      {/* Left Column */}
      <div>
        {/* Radius property smooths the corners of the column border */}
        <DashboardReservationList />
        {/* <Skeleton
          height={600}
          mt={6}
          width="100%"
          radius="md"
          animate={false}
        /> */}
      </div>
      {/* Right Column */}
      <div>
        {/* <Skeleton
          height={130}
          mt={6}
          mb={10}
          width="100%"
          radius="md"
          animate={false}
        /> */}
        <VacancyRate />
        <Skeleton
          height={130}
          mb={10}
          width="100%"
          radius="md"
          animate={false}
        />
        <Skeleton
          height={130}
          mb={10}
          width="100%"
          radius="md"
          animate={false}
        />
        <SimpleGrid cols={2}>
          {/* Sub-Left Column */}
          <div>
            <Skeleton
              height={170}
              mt={2}
              mb={10}
              width="100%"
              radius="md"
              animate={false}
            />
          </div>
          {/* Sub-Right Column */}
          <div>
            <Skeleton
              height={170}
              mt={2}
              mb={10}
              width="100%"
              radius="md"
              animate={false}
            />
          </div>
        </SimpleGrid>
      </div>
    </SimpleGrid>
  );
}
