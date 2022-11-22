import {
  Center,
  createStyles,
  Group,
  ScrollArea,
  Table,
  Text,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import { keys } from '@mantine/utils';
import {
  IconChevronDown,
  IconChevronUp,
  IconSearch,
  IconSelector,
} from '@tabler/icons';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import Reservation from '../../Models/Reservation';

const useStyles = createStyles((theme) => ({
  th: {
    padding: '0 !important',
  },

  control: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
}));

interface TableSortProps {
  data: Reservation[];
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const { classes } = useStyles();
  const IconReversed = reversed ? IconChevronUp : IconChevronDown;
  const Icon = sorted ? IconReversed : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={14} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function filterData(data: Reservation[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) =>
      item[key].toString().toLowerCase().includes(query)
    )
  );
}

function sortData(
  data: Reservation[],
  payload: {
    sortBy: keyof Reservation | null;
    reversed: boolean;
    search: string;
  }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].toString().localeCompare(a[sortBy]);
      }
      return a[sortBy].toString().localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

export default function ReservationsTable({ data }: TableSortProps) {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof Reservation | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof Reservation) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    );
  };

  useEffect(() => {
    setSortedData(data);
  }, [data]);

  const rows = sortedData.map((row) => (
    <tr key={row.id}>
      <td>
        <Center>{row.customer.fullName}</Center>
      </td>
      <td>
        <Center>{`${row.sitting.type} (${dayjs(row.sitting.startTime).format(
          'ddd hh:mma'
        )} - ${dayjs(row.sitting.endTime).format('hh:mma')}) `}</Center>
      </td>
      {/* <td>
        <Center>{row.venueId}</Center>
      </td> */}
      <td>
        <Center>{dayjs(row.dateTime).format('hh:mma ddd DD MMM YY')}</Center>
      </td>
      <td>
        <Center>{row.duration} mins</Center>
      </td>
      <td>
        <Center>{row.noGuests}</Center>
      </td>
      <td>
        <Center>{row.source}</Center>
      </td>
      <td>
        <Center>{row.status}</Center>
      </td>
      <td>
        <Center>{row.notes}</Center>
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        icon={<IconSearch size={14} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        sx={{ tableLayout: 'fixed', minWidth: 700 }}
      >
        <thead>
          <tr>
            <Th
              sorted={sortBy === 'customerId'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('customerId')}
            >
              Customer
            </Th>
            <Th
              sorted={sortBy === 'sittingId'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('sittingId')}
            >
              Sitting
            </Th>
            {/* <Th
              sorted={sortBy === 'venueId'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('venueId')}
            >
              Venue
            </Th> */}
            <Th
              sorted={sortBy === 'dateTime'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('dateTime')}
            >
              Date
            </Th>
            <Th
              sorted={sortBy === 'duration'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('duration')}
            >
              Duration
            </Th>
            <Th
              sorted={sortBy === 'noGuests'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('noGuests')}
            >
              No. of Guests
            </Th>
            <Th
              sorted={sortBy === 'source'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('source')}
            >
              Source
            </Th>
            <Th
              sorted={sortBy === 'status'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('status')}
            >
              Status
            </Th>
            <Th
              sorted={sortBy === 'notes'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('notes')}
            >
              Notes
            </Th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={9}>
                {/* <td colSpan={Object.keys(data[0]).length}> */}
                <Text weight={500} align="center">
                  Nothing found
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
}
