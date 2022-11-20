// Components
// #region
import { SimpleGrid, Skeleton } from '@mantine/core';
import DashboardReservationWidget from '../Reservations/DashboardReservationWidget';
import VacancyWidget from '../Reservations/VacancyWidget';
// #endregion

export default function DashboardGrid() {
  return (
    // Breakpoints prop handles responsivity.
    // <SimpleGrid
    //   cols={2}
    //   breakpoints={[
    //     { maxWidth: 'xs', cols: 1 },
    //     { maxWidth: 'sm', cols: 1 },
    //     { maxWidth: 'md', cols: 2 },
    //     { maxWidth: 'lg', cols: 2 },
    //     { maxWidth: 'xl', cols: 2 },
    //   ]}
    //   spacing={0}
    //   className="pb-4"
    // />
    <DashboardReservationWidget />
  );
}
