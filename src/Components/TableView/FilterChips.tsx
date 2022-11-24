/* eslint-disable react/jsx-no-bind */
import { Chip } from '@mantine/core';
import { useEventListener, useMediaQuery } from '@mantine/hooks';

interface Props {
  filters: [boolean, boolean, boolean];
  onChange: (filters: [boolean, boolean, boolean]) => void;
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
  const largeScreen = useMediaQuery('(min-width: 1350px)');

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
        size={largeScreen ? 'sm' : 'xs'}
        checked={filters.every((v) => !v)}
        onChange={() => onChange([false, false, false])}
      >
        All
      </Chip>
      <Chip
        size={largeScreen ? 'sm' : 'xs'}
        checked={filters[0]}
        onChange={() => onChange([!filters[0], filters[1], filters[2]])}
      >
        Seated
      </Chip>
      <Chip
        size={largeScreen ? 'sm' : 'xs'}
        checked={filters[1]}
        onChange={() => onChange([filters[0], !filters[1], filters[2]])}
      >
        Partially Seated
      </Chip>
      <Chip
        size={largeScreen ? 'sm' : 'xs'}
        checked={filters[2]}
        onChange={() => onChange([filters[0], filters[1], !filters[2]])}
      >
        Not Seated
      </Chip>
    </div>
  );
}
