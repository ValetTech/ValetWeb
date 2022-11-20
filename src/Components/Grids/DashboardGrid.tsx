// Components
// #region
import { SimpleGrid, Skeleton } from '@mantine/core';
import DashboardReservationWidget from '../Reservations/DashboardReservationWidget';
import VacancyWidget from '../Reservations/VacancyWidget';
// #endregion

export default function DashboardGrid() {
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
      spacing={0}
      className="pb-4"
    >
      {/* Left Column */}
      <div className=" px-4 sm:pr-0">
        <VacancyWidget />
        {/* <Skeleton
          height={130}
          mt={6}
          mb={10}
          width="100%"
          radius="md"
          animate={false}
        /> */}
        {/* Vacancy rate */}
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
            {/* Available tables */}
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
            {/* Unallocated reservations */}
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

      {/* Right Column */}
      <div>
        {/* Radius property smooths the corners of the column border */}
        <DashboardReservationWidget />
        {/* <Skeleton
          height={600}
          mt={6}
          width="100%"
          radius="md"
          animate={false}
    /> */}
      </div>
    </SimpleGrid>
  );
}
