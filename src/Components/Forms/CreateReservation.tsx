// Lint Rules
// #region
/* eslint-disable react/jsx-props-no-spreading */
// #endregion

// Components
// #region
import {
  Button,
  Card,
  Group,
  Input,
  Modal,
  NumberInput,
  Select,
  SimpleGrid,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconPencil } from '@tabler/icons';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

import Area from '../../Models/Area';
import Sitting from '../../Models/Sitting';
// #endregion
// #endregion

// Services
// #region
import { createReservationAndCustomerAsync } from '../../Services/ApiServices';
import ErrorNotification from '../Notifications/NotifyError';
import { BasicDateTimePickerNew } from './DateTimePicker';
// #endregion

// Props
// #region
interface CreateReservationModalProps {
  opened: boolean;
  onClose(): void;
  sittingsData: Sitting[];
  areasData: Area[];
}
// #endregion

export default function CreateReservationModal({
  opened,
  onClose,
  areasData,
  sittingsData,
}: CreateReservationModalProps) {
  // const [datePickerValue, setDatePickerValue] = useState(new Date());
  // const [timePickerValue, setTimePickerValue] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      sittingId: 0,
      areaId: 0,
      time: '',
      date: '',
      duration: 90,
      noGuests: 1,
      notes: '',
      isVip: '',
    },
    validate: {
      lastName: (value) =>
        value.length < 2 ? 'Please provide a valid first name' : null,
      phone: (value) =>
        value.length < 10 ? 'Please provide a valid phone number' : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      noGuests: (value) =>
        value < 1 ? 'Please enter a valid number of guests' : null,
    },
  });

  // Name of sitting will be displayed in select, but it will return the ID number.
  const sittings = sittingsData.map((s) => ({
    label: s.type,
    value: s.id,
  }));

  const areas = areasData.map((a) => ({
    label: a.name,
    value: a.id,
  }));

  return (
    <Modal
      centered
      opened={opened}
      onClose={onClose}
      title="Create New Reservation"
      size="xl"
    >
      <form
        onSubmit={form.onSubmit((values) => {
          console.log(selectedDate);
          createReservationAndCustomerAsync({
            customer: {
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              phone: values.phone,
              isVip: values.isVip,
            },
            sittingId: values.sittingId,
            areaId: values.areaId,
            dateTime: selectedDate,
            duration: values.duration,
            noGuests: values.noGuests,
            notes: values.notes,
          })
            .catch((e) => {
              console.log(e);
              ErrorNotification(e.message);
            })
            .then((response) => {
              // console.log(response);
            });

          // createCustomerAsync({
          //   firstName: values.firstName,
          //   lastName: values.lastName,
          //   email: values.email,
          //   phone: values.phone,
          //   isVip: values.isVip,
          // }).then((customerResponse) => {
          //   console.log(customerResponse.data);
          //   createReservationAsync({
          //     customerId: customerResponse.data.id,
          //     sittingId: values.sittingId,
          //     areaId: values.areaId,
          //     dateTime: getDateTimeString(),
          //     duration: values.duration,
          //     noGuests: values.noGuests,
          //     notes: values.notes,
          //   }).then((reservationResponse) => {
          //     console.log(reservationResponse.data);
          //     onClose();
          //   });
          // });
        })}
      >
        <SimpleGrid cols={1}>
          <Group position="center">
            <Card radius="md" p="xl">
              <Title color="dimmed" italic size="h5" align="center">
                CUSTOMER DETAILS
              </Title>
              <SimpleGrid cols={2}>
                <>
                  <TextInput
                    label="First Name"
                    mt={20}
                    icon={<IconPencil />}
                    {...form.getInputProps('firstName')}
                  />
                  <TextInput
                    label="Last Name"
                    mt={20}
                    icon={<IconPencil />}
                    withAsterisk
                    required
                    {...form.getInputProps('lastName')}
                  />
                </>
                <>
                  <TextInput
                    label="Phone"
                    mt={20}
                    icon={<IconPencil />}
                    withAsterisk
                    required
                    {...form.getInputProps('phone')}
                  />
                  <TextInput
                    label="Email"
                    mt={20}
                    icon={<IconPencil />}
                    {...form.getInputProps('email')}
                  />
                </>
              </SimpleGrid>
            </Card>
          </Group>
          <Group position="center">
            <Card radius="md" px={150}>
              <Title color="dimmed" italic size="h5" align="center">
                RESERVATION DETAILS
              </Title>
              <Select
                data={sittings}
                label="Sitting Id"
                mt={20}
                icon={<IconPencil />}
                withAsterisk
                {...form.getInputProps('sittingId')}
              />
              <Select
                data={areas}
                label="Area"
                mt={20}
                icon={<IconPencil />}
                withAsterisk
                {...form.getInputProps('areaId')}
                mb={30}
              />
              {/* <DateTimePicker
                  label="DateTime"
                  inputVariant="outlined"
                  value={selectedDate}
                  onChange={handleDateChange}
                /> */}
              <Input.Wrapper label="Time" required>
                <Input
                  component={BasicDateTimePickerNew}
                  value={selectedDate}
                  onChange={setSelectedDate}
                />
              </Input.Wrapper>
              <NumberInput
                label="Duration"
                mt={20}
                icon={<IconPencil />}
                withAsterisk
                required
                {...form.getInputProps('duration')}
              />
              <NumberInput
                label="Number of Guests"
                mt={20}
                icon={<IconPencil />}
                withAsterisk
                required
                {...form.getInputProps('noGuests')}
              />
              <Textarea
                autosize
                minRows={2}
                maxRows={4}
                label="Notes"
                mt={20}
                mb={20}
                icon={<IconPencil />}
                {...form.getInputProps('notes')}
              />
              <Select
                label="VIP"
                data={[
                  { value: 'false', label: 'False' },
                  { value: 'true', label: 'True' },
                ]}
                icon={<IconPencil />}
                {...form.getInputProps('isVip')}
              />
            </Card>
          </Group>
        </SimpleGrid>
        <Group mt={20} position="center">
          <Button className="bg-[#FFB703]" type="submit" size="lg">
            Create
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
