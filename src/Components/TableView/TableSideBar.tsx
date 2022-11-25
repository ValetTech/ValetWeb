/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-bind */
import { useDraggable } from '@dnd-kit/core';
import {
  Button,
  Center,
  createStyles,
  Divider,
  Loader,
  Paper,
  ScrollArea,
  Select,
  Text,
  TextInput,
} from '@mantine/core';
import { useScrollLock, useViewportSize } from '@mantine/hooks';
import { IconCalendarEvent, IconSearch, IconStar } from '@tabler/icons';
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
  loading: boolean;
  selectedArea: Area | undefined;
  loadReservations: () => void;
}

export default function TableSideBar({
  data,
  sittings,
  selectedSitting,
  selectSitting,
  params,
  setParams,
  areas,
  loading,
  selectedArea,
  loadReservations,
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
        <FilterChips params={params} setParams={setParams} />
        {/* TABLE */}
        <div className="m-2 ">
          {loading && (
            <Center className="mt-4">
              <Loader variant="dots" />
            </Center>
          )}
          <ScrollArea.Autosize maxHeight={height - 250} offsetScrollbars>
            {/* <TableSort data={rowData} /> */}

            {Array.isArray(data) && data?.length ? (
              <div className="space-y-2 select-none">
                {data.map((item: Reservation) => (
                  <Paper
                    key={`reservation-${item.id}`}
                    className="p-2  focus:hidden"
                  >
                    <Draggable
                      key={`reservation-${item.id}`}
                      id={`reservation-${item.id}`}
                      type="reservation"
                    >
                      <Divider
                        variant="dotted"
                        label="Customer"
                        labelPosition="center"
                      />
                      <div>
                        <div className="flex flex-row flex-nowrap  justify-center">
                          {item?.customer?.isVip && (
                            <IconStar size={16} className="mr-4" />
                          )}
                          <Text className="" size="sm">
                            {item.customer?.fullName ?? 'Unnamed Customer'}
                          </Text>
                        </div>
                        <Divider
                          variant="dotted"
                          label="Date"
                          labelPosition="center"
                        />
                        <div className="flex flex-nowrap justify-center">
                          <Text size="sm">
                            {dayjs(item.dateTime).format('h:mm A - D MMM YY')}
                          </Text>
                        </div>
                        <Divider
                          variant="dotted"
                          label="Info"
                          labelPosition="center"
                        />
                        <div className="flex flex-wrap flex-auto justify-evenly ">
                          <Text size="sm">
                            {item.noGuests ?? 1}{' '}
                            {item.noGuests === 1 ? 'Guest' : 'Guests'}
                          </Text>
                          <Text size="sm">{item.duration} mins</Text>
                          <Text size="sm">{item.tables?.length} tables</Text>
                        </div>
                      </div>
                    </Draggable>
                  </Paper>
                ))}
              </div>
            ) : (
              <div>
                <Center className="py-4">
                  <Text size="xl">No Reservations</Text>
                </Center>
              </div>
            )}
            <Center>
              <Button
                className="bg-[#FFB703] my-5"
                size="lg"
                onClick={() => setReservationModal(true)}
              >
                Create Reservation
              </Button>
            </Center>
          </ScrollArea.Autosize>
          <CreateReservationModal
            areasData={areas}
            sitting={selectedSitting ?? undefined}
            area={selectedArea ?? undefined}
            sittingsData={sittings}
            opened={reservationModal}
            onClose={() => {
              loadReservations();
              setReservationModal(false);
            }}
          />
        </div>
      </div>
    </Center>
  );
}
