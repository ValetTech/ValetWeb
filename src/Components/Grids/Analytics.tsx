import { Center, RingProgress, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import Reservation from '../../Models/Reservation';

interface AnalyticsProps {
  reservations: Reservation[];
}

export default function Analytics({ reservations }: AnalyticsProps) {
  const [unallocatedReservations, setUnallocatedReservations] = useState<
    Reservation[]
  >(reservations.filter((r) => r.tables?.length === 0));
  const [allocatedReservations, setAllocatedReservations] = useState<
    Reservation[]
  >(
    reservations.filter(
      (r) =>
        r.tables?.length !== 0 &&
        r.noGuests >=
          r.tables?.map((table) => table.capacity).reduce((a, b) => a + b, 0)
    )
  );
  const [partiallyAllocated, setPartiallyAllocated] = useState<Reservation[]>(
    reservations.filter(
      (r) =>
        r.tables?.length !== 0 &&
        r.noGuests <
          r.tables?.map((table) => table.capacity).reduce((a, b) => a + b, 0)
    )
  );
  const [totalOccupancy, setTotalOccupancy] = useState<number>(0);
  const [totalVacancies, setTotalVacancies] = useState<number>(0);
  const [totalAveragePartySize, setTotalAveragePartySize] = useState<number>(0);
  const [totalAverageDuration, setTotalAverageDuration] = useState<number>(0);

  useEffect(() => {
    setAllocatedReservations(
      reservations.filter(
        (r) =>
          r.tables?.length !== 0 &&
          r.noGuests <
            r.tables?.map((table) => table.capacity).reduce((a, b) => a + b, 0)
      )
    );

    setPartiallyAllocated(
      reservations.filter(
        (r) =>
          r.tables?.length !== 0 &&
          r.noGuests >
            r.tables?.map((table) => table.capacity).reduce((a, b) => a + b, 0)
      )
    );

    setUnallocatedReservations(
      reservations.filter((r) => r.tables?.length === 0)
    );

    setTotalOccupancy(
      reservations.map((r) => r.noGuests).reduce((a, b) => a + b, 0)
    );
    setTotalVacancies(
      reservations.filter((r) => r.areaId === 0).length / reservations.length
    );

    setTotalAveragePartySize(
      reservations.reduce((a, b) => a + (b.noGuests ?? 0), 0) /
        reservations.length
    );
    setTotalAverageDuration(
      reservations.reduce((a, b) => a + (b.duration ?? 0), 0) /
        reservations.length
    );
  }, [reservations]);

  function guestsInArea(area: string): number {
    return reservations
      .filter((r) => r.area.name === area)
      .map((r) => r.noGuests)
      .reduce((a, b) => a + b, 0);
  }

  return (
    <div className="flex flex-grow flex-col xs:flex-row mt-5 h-full xs:space-x-3">
      <div className="w-full flex flex-col flex-grow  mb-3 xs:mb-0 rounded-lg justify-evenly p-2 space-y-1 shadow-lg bg-[#f1f4f8]">
        <div>
          <Text weight={700} align="center" size="xl">
            Average Party Size
          </Text>
          <Center>
            <Text color="blue" weight={700} align="center" size="xl">
              {totalAveragePartySize} guests
            </Text>
          </Center>
        </div>
        <div>
          <Text weight={700} align="center" size="xl">
            Average Duration
          </Text>
          <Center>
            <Text color="blue" weight={700} align="center" size="xl">
              {totalAverageDuration} minutes
            </Text>
          </Center>
        </div>
      </div>
      <div className="w-full h-full rounded-lg p-2 shadow-lg bg-[#f1f4f8] mb-3 xs:mb-0">
        <Text weight={700} align="center" size="xl">
          Unallocated Reservations
        </Text>
        <Center>
          <RingProgress
            label={
              <Text color="blue" weight={700} align="center" size="xl">
                {unallocatedReservations.length} / {reservations.length}
              </Text>
            }
            sections={[
              {
                value:
                  (allocatedReservations.length / reservations.length) * 100,
                color: 'green',
                tooltip: `Seated: ${allocatedReservations.length}`,
              },
              {
                value: (partiallyAllocated.length / reservations.length) * 100,
                color: 'orange',
                tooltip: `Partially Seated: ${partiallyAllocated.length}`,
              },
              {
                value:
                  (unallocatedReservations.length / reservations.length) * 100,
                color: 'red',
                tooltip: `Not Seated: ${unallocatedReservations.length}`,
              },
            ]}
          />
        </Center>
      </div>
      <div className="w-full h-full rounded-lg justify-evenly p-2 shadow-lg bg-[#f1f4f8]">
        <Text weight={700} align="center" size="xl">
          Occupancy Rate
        </Text>
        <Center>
          <RingProgress
            label={
              <Text color="blue" weight={700} align="center" size="lg">
                {totalOccupancy} Guests
              </Text>
            }
            sections={[
              {
                value: (guestsInArea('Main') / totalOccupancy) * 100,
                color: 'cyan',
                tooltip: `Main: ${guestsInArea('Main')} guests`,
              },
              {
                value: (guestsInArea('Outside') / totalOccupancy) * 100,
                color: 'orange',
                tooltip: `Outside: ${guestsInArea('Outside')} guests`,
              },
              {
                value: (guestsInArea('Balcony') / totalOccupancy) * 100,
                color: 'grape',
                tooltip: `Balcony: ${guestsInArea('Balcony')} guests`,
              },
            ]}
          />
        </Center>
      </div>
      {/* <div className="w-1/4">
              <Title>Available Tables</Title>
              <Center>
                <RingProgress
                  label={
                    <Text size="xs" align="center">
                      Application data usage
                    </Text>
                  }
                  sections={[
                    { value: 40, color: 'cyan' },
                    { value: 15, color: 'orange' },
                    { value: 15, color: 'grape' },
                  ]}
                />
              </Center>
            </div> */}
    </div>
  );
}
