/* eslint-disable react/jsx-no-bind */
import { useDraggable } from '@dnd-kit/core';
import {
  Button,
  Center,
  createStyles,
  ScrollArea,
  Select,
  Text,
  TextInput,
} from '@mantine/core';
import { useListState, useScrollLock, useViewportSize } from '@mantine/hooks';
import { IconCalendarEvent, IconSearch } from '@tabler/icons';
import dayjs from 'dayjs';
import { ChangeEvent, useEffect, useState } from 'react';
import Area from '../../Models/Area';
import Reservation from '../../Models/Reservation';
import ReservationParams from '../../Models/ReservationParams';
import Sitting from '../../Models/Sitting';
import CreateReservationModal from '../Forms/CreateReservation';
import FilterChips from './FilterChips';

interface SearchBarProps {
  search: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function SearchBar({ search, onChange }: SearchBarProps) {
  return (
    <TextInput
      placeholder="Search by Customer Name"
      icon={<IconSearch size={20} stroke={1.5} />}
      value={search}
      onChange={onChange}
    />
  );
}

const useStyles = createStyles((theme) => ({
  item: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.radius.md,
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.white,
    marginBottom: theme.spacing.sm,
  },

  itemDragging: {
    boxShadow: theme.shadows.sm,
  },

  symbol: {
    fontSize: 30,
    fontWeight: 700,
    width: 60,
  },
}));

export function Draggable({ id, type, children }: any) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { type },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      className="active:opacity-0 p-0 m-0"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
}

export function ReservationsList({ data }: any) {
  const classes = useStyles();
  const [items, setItems] = useListState<Reservation>(data);

  return (
    <>
      {items.map((item: Reservation) => (
        <Draggable
          key={`reservation-${item.id}`}
          id={`reservation-${item.id}`}
          type="reservation"
        >
          <div className="p-2 z-50 focus:hidden">
            <Text className="" size="sm">
              {item.customer?.fullName ?? 'Unnamed Customer'}
            </Text>
            <Text size="sm">
              {dayjs(item.dateTime).format('h:mm A - D MMM YY')}
            </Text>
            <Text size="sm">{item.tables?.length} tables</Text>
            <Text color="dimmed" size="sm">
              Source: {item.source ?? 'Unknown Source'}
            </Text>
            <Text color="dimmed" size="sm">
              Status: {item.status ?? 'No Status'}
            </Text>
          </div>
        </Draggable>
      ))}
    </>
  );
}

enum State {
  Pending,
  Confirmed,
  Cancelled,
  Assigned,
  Seated,
  Completed,
}

interface TableSideBarProps {
  data: Reservation[];
  sittings: Sitting[];
  selectedSitting: Sitting | null;
  selectSitting: (sitting: Sitting | null) => void;
  params: ReservationParams;
  setParams: (params: ReservationParams) => void;
  areas: Area[];
}

export default function TableSideBar({
  data,
  sittings,
  selectedSitting,
  selectSitting,
  params,
  setParams,
  areas,
}: TableSideBarProps) {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<[boolean, boolean, boolean]>([
    false,
    false,
    false,
  ]);
  const [reservationModal, setReservationModal] = useState<boolean>(false);
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    // setSortedData(
    //   sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    // );
  };

  useEffect(() => {
    setParams({
      ...params,
      Customer: search ?? undefined,
    });
  }, [search]);

  useEffect(() => {
    const newParams = { ...params };
    newParams.Status = filters[0] ? State.Assigned.toString() : undefined;
    newParams.Source =
      filters[1] || filters[2]
        ? `${State.Pending},${State.Confirmed}`
        : undefined;
    newParams.hasTables = filters[1] ? true : undefined;
    newParams.hasTables = filters[2] ? false : undefined;
    setParams(newParams);
  }, [filters]);

  const { height, width } = useViewportSize();
  const [scrollLocked, setScrollLocked] = useScrollLock();

  useEffect(() => {
    // setScrollLocked(true);
  }, [setScrollLocked]);

  return (
    <Center className="h-full w-full">
      <div className="h-full w-full">
        {/* Sitting Select */}
        <Select
          className="mb-2"
          placeholder="Select a sitting"
          icon={<IconCalendarEvent size={20} stroke={1.5} />}
          data={sittings
            .filter(
              (sitting) => dayjs(sitting.endTime) >= dayjs().add(-1, 'day')
            )
            .map((sitting) => ({
              label: `${sitting.title ?? sitting.type}, ${dayjs(
                sitting.startTime
              ).format('ddd, D MMM, YYYY')} ${
                sitting.areas?.length ? ' *' : ''
              }`,
              value: sitting.id?.toString() ?? '',
              group: sitting.type,
            }))}
          value={selectedSitting?.id?.toString() ?? undefined}
          onChange={(value) => {
            selectSitting(
              sittings.find((s) => s.id?.toString() === value) ?? null
            );
          }}
        />
        {/* SEARCH */}
        <SearchBar search={search} onChange={handleSearchChange} />
        {/* CHIPS */}
        <FilterChips filters={filters} onChange={setFilters} />
        {/* TABLE */}
        <div className="m-2 ">
          <ScrollArea.Autosize
            maxHeight={height}
            className="overscroll-contain"
          >
            {/* <TableSort data={rowData} /> */}
            {Array.isArray(data) && data?.length ? (
              <ReservationsList data={data} />
            ) : (
              <div>
                <Center className="py-4">
                  <Text size="xl">No Reservations</Text>
                </Center>
                <Center>
                  <Button
                    className="bg-[#FFB703]"
                    size="lg"
                    onClick={() => setReservationModal(true)}
                  >
                    Create Reservation
                  </Button>
                </Center>
              </div>
            )}
          </ScrollArea.Autosize>
          <CreateReservationModal
            areasData={areas}
            sitting={selectedSitting ?? undefined}
            sittingsData={sittings}
            opened={reservationModal}
            onClose={() => setReservationModal(true)}
          />
        </div>
      </div>
    </Center>
  );
}
