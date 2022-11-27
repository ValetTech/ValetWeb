/* eslint-disable react/jsx-no-bind */
import { faker } from '@faker-js/faker';
import { Button, Center, Select } from '@mantine/core';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import CreatedNotification from '../Components/Notifications/NotifyCreate';
import ErrorNotification from '../Components/Notifications/NotifyError';
import Reservation from '../Models/Reservation';
import Sitting from '../Models/Sitting';
import {
  createReservationAsync,
  getSittingsAsync,
} from '../Services/ApiServices';

export default function GenerateData() {
  const [value, setValue] = useState<string | null>('reservation');
  const [sittings, setSittings] = useState<Sitting[]>([]);

  useEffect(() => {
    getSittingsAsync().then((data: Sitting[]) => {
      setSittings(data.filter((s) => dayjs(s.endTime).isAfter(dayjs())));
    });
  }, []);

  function generateData() {
    if (value === 'sittings') {
      console.log('sittings');
    } else if (value === 'reservation') {
      const randomSitting =
        sittings[Math.floor(Math.random() * sittings.length)];
      const randomArea =
        randomSitting?.areas?.length > 0
          ? randomSitting?.areas[
              Math.floor(Math.random() * randomSitting.areas?.length)
            ]
          : null;

      const newReservation: Reservation = {
        customer: {
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email(),
          phone: faker.phone.number(),
        },
        sittingId: randomSitting.id,
        areaId: randomArea.id,
        dateTime: faker.date
          .between(randomSitting.startTime, randomSitting.endTime)
          .toISOString(),
        duration: 60,
        noGuests: Math.floor(Math.random() * 10) + 1,
        source: 'Website',
        status: 'Pending',
        notes: faker.lorem.paragraph(),
      };

      createReservationAsync(newReservation)
        .then((data) => {
          CreatedNotification();
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
          ErrorNotification(error.message);
        });
    }
  }
  return (
    <Center>
      <div className="flex flex-col items-center space-y-5">
        <h1>Generate Data</h1>
        <Select
          label="Type of data to generate"
          placeholder="Pick one"
          defaultValue={value}
          data={[{ label: 'Reservation', value: 'reservation' }]}
          value={value}
          onChange={setValue}
        />
        <Button onClick={generateData}>Generate Data</Button>
      </div>
    </Center>
  );
}
