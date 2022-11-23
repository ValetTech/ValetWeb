/* eslint-disable react/jsx-no-bind */
// Components
// #region
import { SegmentedControl, Skeleton } from '@mantine/core';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import Area from '../../Models/Area';
import Reservation from '../../Models/Reservation';
import ReservationParams from '../../Models/ReservationParams';
import Sitting from '../../Models/Sitting';
import getReservationsAsync, {
  getAreasAsync,
  getSittingsAsync,
  updateReservationAsync,
} from '../../Services/ApiServices';
import ErrorNotification from '../Notifications/NotifyError';
import UpdatedNotification from '../Notifications/NotifyUpdate';
import ReservationFilters from '../Reservations/DashboardReservationWidget';
import Analytics from './Analytics';
import ReservationTable from './ReservationTable';
// #endregion

export default function DashboardGrid() {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [value, setValue] = useState('reservations');

  const [params, setParams] = useState<ReservationParams>({});
  // useState for reservations
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [sittings, setSittings] = useState<Sitting[]>([]);
  // useState for vacancies
  // useState for occupancy
  // useState for revenue
  // useState for occupancy rate
  // useState for average spend
  // useState for average party size
  // useState for average duration

  // get reseravtions from api and set state
  useEffect(() => {
    getReservationsAsync()
      .then((res) => setReservations(res))
      .catch((err) => {
        console.log(err);
        ErrorNotification(err.message);
      });
    getAreasAsync()
      .then((res) => setAreas(res))
      .catch((err) => {
        console.log(err);
        ErrorNotification(err.message);
      });
    getSittingsAsync()
      .then((res) => setSittings(res))
      .catch((err) => {
        console.log(err);
        ErrorNotification(err.message);
      });
  }, []);

  useEffect(() => {
    getReservationsAsync(params)
      .then((res) => setReservations(res))
      .catch((err) => {
        console.log(err);
        ErrorNotification(err.message);
      });
  }, [params]);

  function UpdateReservation(reservation: Reservation) {
    updateReservationAsync(reservation?.id ?? 0, reservation)
      .then((res) => {
        console.log(res);
        UpdatedNotification();
      })
      .catch((err) => {
        console.log(err);
        ErrorNotification(err.message);
      });
  }

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
    <div className="h-full">
      <ReservationFilters
        reservations={reservations}
        areas={areas}
        sittings={sittings}
        params={params}
        setParams={setParams}
      >
        <SegmentedControl
          value={value}
          onChange={setValue}
          fullWidth
          data={[
            { label: 'Reservations', value: 'reservations' },
            { label: 'Analytics', value: 'analytics' },
          ]}
        />
        {value === 'reservations' ? (
          <Skeleton visible={false}>
            <ReservationTable
              reservations={reservations}
              UpdateReservation={UpdateReservation}
            />
          </Skeleton>
        ) : (
          <Skeleton visible={false}>
            <Analytics reservations={reservations} />
          </Skeleton>
        )}
      </ReservationFilters>
    </div>
  );
}
