/* eslint-disable react/jsx-props-no-spreading */
import {
  Box,
  Button,
  Card,
  Collapse,
  Group,
  Modal,
  NumberInput,
  Select,
  Switch,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useTheme } from '@mui/material';
import { IconPencil } from '@tabler/icons';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import BasicDateTimePicker, {
  BasicDateTimePickerNew,
} from '../Forms/DateTimePicker';
import Recurrence from './Recurrence';

interface RecurringEvent {
  title: string; // name of event
  type: string;
  capacity: number;

  allDay: boolean;
  startTime: Date;
  endTime: Date;

  // Repeat
  repeat: string; // [none, daily, weekly, monthly]
  repeatEvery: number; // Every X [days, weeks, months, years]
  // Daily
  // Weekly
  repeatOn: number[]; // [days of week]

  // Monthly
  repeatOnDay: number; // [day of month]

  // Ends
  repeatUntil: Date; // Repeat until [date]
  repeatXTimes: number; // Repeat X times

  // Delete Sitting

  startRecur: Date;
  endRecur: Date;

  daysOfWeek: number[];

  groupId: number; // UUID
}

export default function NewEventModal({ isOpen, onClose }: any) {
  const [opened, setOpened] = useState(false);
  const [dateTime, setDateTime] = useState<Date | null>(new Date());
  const [value, setValue] = useState<Dayjs | null>(dayjs('2022-04-07T12:00'));
  const [recurring, setRecurring] = useState(false);
  const [allDay, setAllDay] = useState(false);

  const theme = useTheme();
  const initialValues: RecurringEvent = {
    title: '',
    type: '',
    capacity: 0,
    allDay: false,
    startTime: new Date(),
    endTime: new Date(),
    repeat: 'none',
    repeatEvery: 0,
    repeatOn: [],
    repeatOnDay: 0,
    repeatUntil: new Date(),
    repeatXTimes: 0,
    startRecur: new Date(),
    endRecur: new Date(),
    daysOfWeek: [],
    groupId: 0,
  };

  const form = useForm({
    initialValues,
    validate: {
      // TODO: Add validation
    },
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Introduce yourself!"
      >
        <Card radius="md" p="xl">
          <Title align="center">Create Sitting</Title>
          <Box sx={{ maxWidth: 300 }} mx="auto" mt={20} mb={50}>
            <form onSubmit={(values) => console.log(values)}>
              <TextInput
                required
                withAsterisk
                label="Title"
                placeholder="New Sitting"
                icon={<IconPencil />}
                {...form.getInputProps('title')}
              />
              <Select
                mt={20}
                required
                withAsterisk
                label="Type"
                placeholder=""
                data={[
                  { value: 'Breakfast', label: 'Breakfast' },
                  { value: 'Lunch', label: 'Lunch' },
                  { value: 'Dinner', label: 'Dinner' },
                  { value: 'Special', label: 'Special' },
                ]}
                {...form.getInputProps('type')}
              />
              <NumberInput
                required
                withAsterisk
                label="Capacity"
                // icon={<IconPencil />}
                {...form.getInputProps('capacity')}
              />
              {/* Start time */}
              <BasicDateTimePicker my="md" value={value} onChange={setValue} />
              <BasicDateTimePickerNew
                my="md"
                value={value}
                onChange={setValue}
              />
              <Collapse in={allDay}>
                {/* End time */}
                <BasicDateTimePicker value={value} onChange={setValue} />
              </Collapse>
              <Switch
                my="md"
                size="md"
                label="All Day"
                checked={allDay}
                onChange={(event) => setAllDay(event.currentTarget.checked)}
              />

              <Switch
                my="md"
                size="md"
                label="Recurring"
                checked={recurring}
                onChange={(event) => setRecurring(event.currentTarget.checked)}
              />
              {/* Reoccurring */}
              <Collapse in={recurring}>
                <Recurrence />
              </Collapse>
              <Group position="center" my="md">
                <Button className="bg-[#FFB703]" type="submit">
                  Submit
                </Button>
              </Group>
            </form>
          </Box>
        </Card>
      </Modal>

      <Group position="center">
        <Button lassName="bg-[#FFB703]" onClick={() => setOpened(true)}>
          Open Modal
        </Button>
      </Group>
    </>
  );
}

/*
Title
Type
Capacity
[
  {
    "capacity": 0,
    "type": "Breakfast",
    "startTime": "2022-10-31T10:30:24.473Z",
    "endTime": "2022-10-31T10:30:24.473Z",
    "venueId": 0,
    "areas": [ 0 ],
  }
]

Event
    Title 
    Description
    Type
    Capacity
    Start Time
    End Time
    Venue
    Areas

Recurring
    Frequency
      freq
      Repeat Every
        Day, Week, Month
    Interval
      interval
      Interval between iterations
        int (1, 2, 3, 4, 5, 6, 7)
    Week Days
      byweekday
      Days of the week
        [0, 1, 2, 3, 4, 5, 6]
    Start Date
      dtstart
      Recurring Start Date
        Date
    Count
      count
      Number of iterations
    Until
      until
      Recurring End Date
        Date

    
*/
