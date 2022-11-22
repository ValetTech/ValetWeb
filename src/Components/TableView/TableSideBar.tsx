/* eslint-disable react/jsx-no-bind */
import { DndContext, useDraggable } from '@dnd-kit/core';
import {
  Center,
  createStyles,
  ScrollArea,
  Select,
  Text,
  TextInput,
} from '@mantine/core';
import { useListState, useScrollLock, useViewportSize } from '@mantine/hooks';
import { keys } from '@mantine/utils';
import { IconCalendarEvent, IconSearch } from '@tabler/icons';
import dayjs from 'dayjs';
import { ChangeEvent, useEffect, useState } from 'react';
import Reservation from '../../Models/Reservation';
import Sitting from '../../Models/Sitting';
import FilterChips from './FilterChips';

interface TableSideBarProps {
  data: Reservation[];
  sittings: Sitting[];
  selectedSitting: Sitting | null;
  selectSitting: (sitting: Sitting | null) => void;
}

function filterData(data: Reservation[], search: string, filters: string[]) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

interface SearchBarProps {
  search: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function SearchBar({ search, onChange }: SearchBarProps) {
  return (
    <TextInput
      placeholder="Search by any field"
      icon={<IconSearch size={20} stroke={1.5} />}
      value={search}
      onChange={onChange}
    />
  );
}

export default function TableSideBar({
  data,
  sittings,
  selectedSitting,
  selectSitting,
}: TableSideBarProps) {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState(['All']);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    // setSortedData(
    //   sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    // );
  };

  function handleFilterChange(value: any) {}

  const { height, width } = useViewportSize();
  const [scrollLocked, setScrollLocked] = useScrollLock();

  useEffect(() => {
    // setScrollLocked(true);
  }, [setScrollLocked]);

  const rowData: RowData[] = [
    {
      name: 'John DoDe',
      company: 'Apple',
      email: '',
    },
    {
      name: 'John DDoe',
      company: 'Apple',
      email: '',
    },
    {
      name: 'John DoeD',
      company: 'Apple',
      email: '',
    },
    {
      name: 'John 1',
      company: 'Apple',
      email: '',
    },
    {
      name: 'John 2',
      company: 'Apple',
      email: '',
    },
    {
      name: 'John 3',
      company: 'Apple',
      email: '',
    },
    {
      name: 'John 4',
      company: 'Apple',
      email: '',
    },
  ];

  return (
    <Center className="h-full w-full">
      <div className="h-full w-full">
        {/* Sitting Select */}
        <Select
          className="mb-2"
          placeholder="Select a sitting"
          icon={<IconCalendarEvent size={20} stroke={1.5} />}
          data={sittings.map((sitting) => ({
            label: `${sitting.title ?? sitting.type}, ${dayjs(
              sitting.startTime
            ).format('dddd, MMMM D, YYYY')}`,
            value: sitting.id?.toString() ?? '',
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
            {Array.isArray(data) && data.length ? (
              <ReservationsList data={data} />
            ) : (
              <Center>
                <Text size="xl">No Reservations</Text>
              </Center>
            )}
          </ScrollArea.Autosize>
        </div>
      </div>
    </Center>
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

export function Draggable({ id, children }: any) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button
      className="active:opacity-0"
      type="button"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      {children}
    </button>
  );
}

export function ReservationsList({ data }: any) {
  const classes = useStyles();
  const [items, setItems] = useListState<Reservation>(data);

  return (
    <>
      {items.map((item: Reservation) => (
        <Draggable key={item.id} id={item.id}>
          <div className="p-2 -z-50 focus:hidden">
            <Text className="pr-2" size="sm">
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

export function ReservationsListt({ data }) {
  const { classes, cx } = useStyles();
  const [state, handlers] = useListState(data);

  const items = state.map((item, index) => (
    <Draggable key={item.id} index={index} draggableId={item.id} data={item}>
      <Text className="pr-2">{item.customer.fullName}</Text>
      <div>
        <Text>{dayjs(item.dateTime).format('h:mm A - D MMM YY')}</Text>
        <Text color="dimmed" size="sm">
          Source: {item.source} | Status: {item.status}
        </Text>
      </div>
    </Draggable>
  ));

  const dItems = state.map((item, index) => (
    <Draggable className="" key={item.id} id={item.id}>
      <Text className="pr-2">Full name</Text>
      <div>
        <Text>{dayjs('2022-10-16').format('h:mm A - D MMM YY')}</Text>
        <Text color="dimmed" size="sm">
          Source: | Status:
        </Text>
      </div>
    </Draggable>
  ));
  return <DndContext autoScroll={false}>{dItems}</DndContext>;
}
