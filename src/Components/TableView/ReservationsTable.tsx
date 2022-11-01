import {
  Center,
  createStyles,
  Group,
  ScrollArea,
  Table,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useScrollLock, useViewportSize } from '@mantine/hooks';
import { keys } from '@mantine/utils';
import { IconChevronDown, IconChevronUp, IconSelector } from '@tabler/icons';
import { useEffect, useState } from 'react';
import { ReservationsList } from '../../Pages/TablesPage';
// import ReservationsList from './TableItem';

export interface BoxProps {
  name: string;
  type: string;
}

export default function ReservationsTable({ data }: any) {
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
    <div className="m-2 ">
      <ScrollArea.Autosize maxHeight={height} className="overscroll-contain">
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
  );
}

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

interface RowData {
  name: string;
  email: string;
  company: string;
}

interface TableSortProps {
  data: RowData[];
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const { classes } = useStyles();
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
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

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

export function TableSort({ data }: TableSortProps) {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof RowData) => {
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

  const rows = sortedData.map((row) => (
    <tr key={row.name}>
      <td>{row.name}</td>
      <td>{row.email}</td>
      <td>{row.company}</td>
    </tr>
  ));

  return (
    <ScrollArea>
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        sx={{ tableLayout: 'fixed', minWidth: 700 }}
      >
        <thead>
          <tr>
            <Th
              sorted={sortBy === 'name'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('name')}
            >
              Name
            </Th>
            <Th
              sorted={sortBy === 'email'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('email')}
            >
              Email
            </Th>
            <Th
              sorted={sortBy === 'company'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('company')}
            >
              Company
            </Th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={Object.keys(data[0]).length}>
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
