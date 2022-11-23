import {
  Button,
  Card,
  Container,
  Divider,
  Group,
  MultiSelect,
  Select,
  Title,
} from '@mantine/core';
import { DateRangePicker, DateRangePickerValue } from '@mantine/dates';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import Area from '../../Models/Area';
import Reservation from '../../Models/Reservation';
import ReservationParams from '../../Models/ReservationParams';
import Sitting from '../../Models/Sitting';
import { getReservationByDateAsync } from '../../Services/ApiServices';
import CreateReservationModal from '../Forms/CreateReservation';

enum State {
  Pending,
  Confirmed,
  Cancelled,
  Assigned,
  Seated,
  Completed,
}
interface DashboardWidgetProps {
  reservations: Reservation[];
  areas: Area[];
  sittings: Sitting[];
  params: ReservationParams;
  setParams: (params: ReservationParams) => void;
  children?: React.ReactNode;
}

export default function DashboardReservationWidget({
  reservations,
  areas,
  sittings,
  params,
  setParams,
  children,
}: DashboardWidgetProps) {
  // UPDATED
  const [dateRange, setDateRange] = useState<DateRangePickerValue>([
    null,
    null,
  ]);
  const [selectedAreas, setSelectedAreas] = useState<string[] | null>([]);
  const [selectedSittings, setSelectedSittings] = useState<string[] | null>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[] | null>([]);
  const [states, setStates] = useState<string[]>(
    Object.keys(State).filter((key) => Number.isNaN(Number(key)))
  );

  const [areaData, setAreaData] = useState<Area[]>([]);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sittingData, setSittingData] = useState<Sitting[]>([]);
  const [reservationData, setReservationData] =
    useState<Reservation[]>(reservations);
  const [filteredReservationData, setFilteredReservationData] = useState<
    Reservation[]
  >([]);
  const [createModalOpened, setCreateModalOpened] = useState(false);

  // useEffect(() => {
  //   resetSittingDropdown();
  // }, [selectedSitting]);

  function onCloseCreateModal() {
    setCreateModalOpened(false);
  }

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

  // useEffect(() => {
  //   console.log(selectedSitting);
  //   const filteredReservations = reservationData.filter((reservation) => {
  //     return reservation.sittingId === selectedSitting;
  //   });
  //   setFilteredReservationData(filteredReservations);
  // }, [selectedSitting]);

  // Mapping the data so that it can be displayed in <Select> component.
  // Name of sitting will be displayed in select, but it will return the ID number.

  // Name of area will be displayed in select, but it will return the ID number.
  // Mapping reservation data for table

  // TODO FIX LAYOUT

  // FILTER RESERVATIONS
  useEffect(() => {
    const reservationParams: ReservationParams = {
      // areaId: selectedArea,
      // sittingId: selectedSitting,
      MinDate: dateRange[0]
        ? dayjs(dateRange[0])?.startOf('day').toISOString()
        : undefined,
      MaxDate: dateRange[1]
        ? dayjs(dateRange[1])?.endOf('day').toISOString()
        : undefined,
      Status: selectedStatus ?? undefined,
      Areas: selectedAreas?.join(',') ?? undefined,
      Sittings: selectedSittings?.join(',') ?? undefined,
    };
    setParams(reservationParams);
  }, [selectedAreas, selectedSittings, selectedStatus, dateRange]);

  return (
    <Container mt={6}>
      <Card withBorder radius="md" className="h-full">
        <div className="w-full flex justify-between mb-5">
          <Title order={3}>Reservations</Title>
          <Button
            className="bg-[#FFB703]"
            size="lg"
            onClick={() => setCreateModalOpened(true)}
          >
            Create
          </Button>
        </div>
        <Divider className="mb-5" />
        <div className="w-full flex flex-col xs:flex-row flex-grow mb-5">
          <div className="w-1/2 xs:mr-5">
            <Title size="h4">Date</Title>
            <DateRangePicker
              clearable
              placeholder="Select Date Range"
              value={dateRange}
              onChange={setDateRange}
            />
          </div>
          <div className="w-1/2">
            <Title size="h4">Status</Title>
            <Select
              clearable
              placeholder="Select Status"
              // data={Object.values(State)}
              data={states}
              onChange={(values) => {
                setSelectedStatus(values ?? null);
              }}
            />
          </div>
        </div>
        <div className="w-full flex flex-col xs:flex-row flex-grow mb-5">
          <div className="w-1/2 xs:mr-5">
            <Title size="h4">Filter by Areas</Title>
            <MultiSelect
              clearable
              placeholder="Select Areas"
              data={[...new Set(areas.map((a) => a.name))]}
              onChange={(values) => {
                setSelectedAreas(values ?? null);
              }}
            />
          </div>
          <div className="w-1/2">
            <Title size="h4">Filter by Sitting types</Title>
            <MultiSelect
              clearable
              placeholder="Select Sittings"
              data={[...new Set(sittings.map((s) => s.type))]}
              onChange={(values) => {
                setSelectedSittings(values ?? null);
              }}
            />
          </div>
        </div>
        {children}
        <Group mt={20} position="left">
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
