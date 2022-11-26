/* eslint-disable react-hooks/exhaustive-deps */
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
import ReservationParams from '../../Models/ReservationParams';
import Sitting from '../../Models/Sitting';
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
  // reservations: Reservation[];
  areas: Area[];
  sittings: Sitting[];
  // params: ReservationParams;
  setParams: (params: ReservationParams) => void;
  children: React.ReactNode;
}

export default function DashboardReservationWidget({
  // reservations,
  areas,
  sittings,
  // params,
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
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const [createModalOpened, setCreateModalOpened] = useState(false);

  // useEffect(() => {
  //   resetSittingDropdown();
  // }, [selectedSitting]);

  function onCloseCreateModal() {
    setCreateModalOpened(false);
  }

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
        <div className="w-full flex justify-between ">
          <h1>Reservations</h1>
          <Button
            className="bg-[#FFB703]"
            size="lg"
            onClick={() => setCreateModalOpened(true)}
          >
            Create
          </Button>
        </div>
        <Divider className="mb-5" />
        <div className="w-full flex flex-row space-x-2 flex-grow mb-2">
          <div className="w-full ">
            <Title size="h4">Date</Title>
            <DateRangePicker
              clearable
              placeholder="Select Date Range"
              value={dateRange}
              onChange={setDateRange}
            />
          </div>
          <div className="w-full h-full">
            <Title size="h4">Status</Title>
            <Select
              clearable
              placeholder="Select Status"
              // data={Object.values(State)}
              data={Object.keys(State).filter((key) =>
                Number.isNaN(Number(key))
              )}
              onChange={(values) => {
                setSelectedStatus(values ?? null);
              }}
            />
          </div>
        </div>
        <div className="w-full h-full flex flex-col xs:flex-row flex-grow space-y-2 xs:space-x-2 xs:space-y-0 mb-3 ">
          <div className="w-full">
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
          <div className="w-full">
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
        <Group position="left">
          <CreateReservationModal
            areasData={areas}
            sittingsData={sittings}
            opened={createModalOpened}
            onClose={() => onCloseCreateModal()}
          />
        </Group>
      </Card>
    </Container>
  );
}
