/* eslint-disable react/jsx-props-no-spreading */
import {
  Box,
  Button,
  Card,
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
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import { IconPencil } from '@tabler/icons';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

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

export default function NewEventModal() {
  const [opened, setOpened] = useState(false);
  const [dateTime, setDateTime] = useState<Date | null>(new Date());
  const [value, setValue] = useState<Dayjs | null>(
    dayjs('2018-01-01T00:00:00.000Z')
  );
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
              <Switch
                mt={20}
                label="All Day"
                // checked={checked}
                // onChange={(event) => setChecked(event.currentTarget.checked)}
                {...form.getInputProps('allDay')}
              />
              {/* //https://mantine.dev/core/collapse/ */}
              {/* <DateTimePicker
                label="Responsive"
                renderInput={(params) => <TextField {...params} {...theme} />}
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
              /> */}
              {/* <DateTimePicker
                label="Date Time Picker"
                placeholder="Pick date time"
                inputFormat="DD-MMM-YYYY hh:mm a"
                {...form.getInputProps('endTime')}
              /> */}
              {/* <TimeInput
                format="12"
                label="Start Time"
                mt={20}
                icon={<IconPencil />}
                withAsterisk
                required
                {...form.getInputProps('startTime')}
                />
                <TimeInput
                format="12"
                label="End Time"
                mt={20}
                icon={<IconPencil />}
                withAsterisk
                required
                {...form.getInputProps('endTime')}
              /> */}
              <Group position="center" mt="md">
                <Button type="submit">Submit</Button>
              </Group>
            </form>
          </Box>
        </Card>
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Open Modal</Button>
      </Group>
    </LocalizationProvider>
  );
}
