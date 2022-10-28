/* eslint-disable react/jsx-no-bind */
import { Center, TextInput } from '@mantine/core';
import { keys } from '@mantine/utils';
import { IconSearch } from '@tabler/icons';
import { ChangeEvent, useState } from 'react';
import Reservation from '../../Models/Reservation';
import FilterChips from './FilterChips';
import ReservationsTable from './ReservationsTable';

interface TableSideBarProps {
  data: Reservation[];
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

export default function TableSideBar({ data }: TableSideBarProps) {
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

  return (
    <Center className="h-full w-full">
      <div className="h-full w-full">
        {/* SEARCH */}
        <SearchBar search={search} onChange={handleSearchChange} />
        {/* CHIPS */}
        <FilterChips filters={filters} onChange={setFilters} />
        {/* TABLE */}
        <ReservationsTable data={data} />
      </div>
    </Center>
  );
}
