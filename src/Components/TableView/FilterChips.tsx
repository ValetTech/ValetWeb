/* eslint-disable react/jsx-no-bind */
import { Chip } from '@mantine/core';
import { useEventListener } from '@mantine/hooks';
import { useState } from 'react';
import ReservationParams from '../../Models/ReservationParams';

interface Props {
  params: ReservationParams;
  setParams: (params: ReservationParams) => void;
}

export default function FilterChips({ params, setParams }: Props) {
  const onWheel = (e: any) => {
    if (e.deltaY === 0) return;
    e.preventDefault();

    e.currentTarget.scrollTo({
      left: e.currentTarget.scrollLeft + e.deltaY,
      // behavior: 'smooth',
    });
  };
  const [chipValue, setChipValue] = useState<string>();

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
        checked={chipValue === 'Assigned'}
        onChange={(value) => {
          setChipValue(value ? 'Assigned' : undefined);
          setParams({
            ...params,
            Status: value ? 'Assigned' : undefined,
          });
        }}
        radius="md"
      >
        Assigned
      </Chip>
      <Chip
        checked={chipValue === 'Pending'}
        onChange={(value) => {
          setChipValue(value ? 'Pending' : undefined);
          setParams({
            ...params,
            Status: value ? 'Pending' : undefined,
          });
        }}
        radius="md"
      >
        Pending
      </Chip>
      <Chip
        checked={chipValue === 'Confirmed'}
        onChange={(value) => {
          setChipValue(value ? 'Confirmed' : undefined);
          setParams({
            ...params,
            Status: value ? 'Confirmed' : undefined,
          });
        }}
        radius="md"
      >
        Confirmed
      </Chip>
      <Chip
        checked={chipValue === 'Seated'}
        onChange={(value) => {
          setChipValue(value ? 'Seated' : undefined);
          setParams({
            ...params,
            Status: value ? 'Seated' : undefined,
          });
        }}
        radius="md"
      >
        Seated
      </Chip>
    </div>
  );
}
