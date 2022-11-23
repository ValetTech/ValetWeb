/* eslint-disable react/jsx-no-bind */
import { Chip } from '@mantine/core';
import { useEventListener } from '@mantine/hooks';

interface Props {
  filters: boolean[];
  onChange: (filters: boolean[]) => void;
}

export default function FilterChips({ filters, onChange }: Props) {
  const onWheel = (e: any) => {
    if (e.deltaY === 0) return;
    e.preventDefault();

    e.currentTarget.scrollTo({
      left: e.currentTarget.scrollLeft + e.deltaY,
      // behavior: 'smooth',
    });
  };

  const ref = useEventListener('wheel', onWheel);

  return (
    <div
      ref={ref}
      className={
        ' overflow-x-auto no-scrollbar no-scrollbar::-webkit-scrollbar ' +
        'flex flex-row flex-grow justify-between space-x-1 pt-2 [&_input]:hidden w-full'
      }
    >
      <Chip
        size="xs"
        checked={filters.every((v) => !v)}
        onChange={() => onChange([false, false, false])}
      >
        All
      </Chip>
      <Chip
        size="xs"
        checked={filters[0]}
        onChange={() => onChange([!filters[0], filters[1], filters[2]])}
      >
        Seated
      </Chip>
      <Chip
        size="xs"
        checked={filters[1]}
        onChange={() => onChange([filters[0], !filters[1], filters[2]])}
      >
        Partially Seated
      </Chip>
      <Chip
        size="xs"
        checked={filters[2]}
        onChange={() => onChange([filters[0], filters[1], !filters[2]])}
      >
        Not Seated
      </Chip>
    </div>
  );
}
