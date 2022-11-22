import {
  Center,
  createStyles,
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
import Customer from '../../Models/Customer';
import Reservation from '../../Models/Reservation';
import Sitting from '../../Models/Sitting';

const useStyles = createStyles((theme) => ({
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
    <th className="!p-0">
      <UnstyledButton onClick={onSort} className={classes.control}>
        <div className="flex flex-row justify-between">
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={14} stroke={1.5} />
          </Center>
        </div>
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
    sortBy: keyof Reservation | keyof Customer | keyof Sitting | null;
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
  const [sortBy, setSortBy] = useState<
    keyof Reservation | keyof Customer | keyof Sitting | null
  >(null);
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
    <ScrollArea className="w-full">
      <TextInput
        placeholder="Search by any field"
        className="w-[95%]"
        mb="md"
        icon={<IconSearch size={14} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
      />
      <div className="w-[95%] overflow-auto">
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          sx={{
            tableLayout: 'auto',
            // minWidth: 700,
            // width: '50%',
            maxWidth: '100%',
            overflowX: 'auto',
            // overflowY: 'hidden',
            // whiteSpace: 'nowrap',
          }}
        >
          <thead>
            <tr>
              <Th
                sorted={sortBy === 'fullName'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('fullName')}
              >
                Customer
              </Th>
              <Th
                sorted={sortBy === 'type'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('type')}
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
                Guests
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
      </div>
    </ScrollArea>
  );
}
