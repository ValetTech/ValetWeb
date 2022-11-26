import {
  Center,
  createStyles,
  ScrollArea,
  Table,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { IconChevronDown, IconChevronUp, IconSelector } from '@tabler/icons';
import dayjs from 'dayjs';
import { useState } from 'react';
import Customer from '../../Models/Customer';
import Reservation from '../../Models/Reservation';
import ReservationParams from '../../Models/ReservationParams';
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

interface TableSortProps {
  reservations: Reservation[];
  params: ReservationParams;
  setParams: (params: ReservationParams) => void;
}

export default function ReservationsTable({
  reservations,
  params,
  setParams,
}: TableSortProps) {
  const [sortBy, setSortBy] = useState<
    keyof Reservation | keyof Customer | keyof Sitting | null
  >(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);

  const setSorting = (field: keyof Reservation) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setParams({
      ...params,
      SortBy: capitalize(field),
      SortOrder: reversed ? 'asc' : 'desc',
    });
  };

  const rows = reservations.map((row) => (
    <tr key={row.id}>
      <td>
        <Center>{row.customer.fullName}</Center>
      </td>
      <td>
        <Center>{`${row.sitting?.type} (${dayjs(row.sitting?.startTime).format(
          'ddd hh:mma'
        )} - ${dayjs(row.sitting?.endTime).format('hh:mma')}) `}</Center>
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
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        sx={{
          tableLayout: 'auto',
          // minWidth: 700,
          // width: '50%',
          maxWidth: '95%',
          overflowX: 'auto',
          // overflowY: 'hidden',
          // whiteSpace: 'nowrap',
        }}
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
    </ScrollArea>
  );
}
