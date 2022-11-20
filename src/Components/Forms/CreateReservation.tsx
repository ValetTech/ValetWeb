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
  Modal,
  NumberInput,
  Select,
  SimpleGrid,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconPencil } from '@tabler/icons';
import { useState } from 'react';
import Area from '../../Models/Area';
import Sitting from '../../Models/Sitting';
// #endregion
// #endregion

// Services
// #region
import {
  createCustomerAsync,
  createReservationAndCustomerAsync,
  createReservationAsync,
} from '../../Services/ApiServices';
// #endregion

// Props
// #region
interface CreateReservationModalProps {
  opened: boolean;
  onClose(): void;
  sittingData: Sitting[];
  areaData: Area[];
}
// #endregion

export default function CreateReservationModal({
  opened,
  onClose,
  sittingData,
  areaData,
}: CreateReservationModalProps) {
  const [datePickerValue, setDatePickerValue] = useState(new Date());
  const [timePickerValue, setTimePickerValue] = useState(new Date());

  // function getDateTime(date: Date, time: Date) {
  //   console.log(`${date.getFullYear()}-${date.getMonth()}-${date.getDay()}T`);
  //   // console.log(date);
  //   // console.log(time);
  //   // return `${date.toISOString().substring(0, 9)}${time
  //   //   .toISOString()
  //   //   .substring(10, time.toString().length)}`;
  // }

  function getDateTimeString() {
    // Sometimes the day is off sometimes not, haven't been able to isolate why yet.
    datePickerValue.setDate(datePickerValue.getDate() + 1);
    return `${
      datePickerValue.toISOString().split('T')[0]
    }T${timePickerValue.toLocaleTimeString('it-IT')}`;
  }

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      sittingId: 0,
      areaId: 0,
      time: new Date(),
      date: new Date(),
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
  const sittings = sittingData.map((s) => ({
    label: s.type,
    value: s.id,
  }));

  const areas = areaData.map((a) => ({
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
            dateTime: getDateTimeString(),
            duration: values.duration,
            noGuests: values.noGuests,
            notes: values.notes,
          }).then((response) => {
            console.log(response);
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
              />
              <TimeInput
                value={timePickerValue}
                onChange={(value) => setTimePickerValue(value)}
                format="12"
                label="Time"
                mt={20}
                icon={<IconPencil />}
                withAsterisk
                required
                {...form.getInputProps('time')}
              />
              <DatePicker
                value={datePickerValue}
                onChange={(value) => setDatePickerValue(value ?? new Date())}
                label="Date"
                dropdownType="modal"
                mt={20}
                withAsterisk
                required
                {...form.getInputProps('date')}
              />
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
          <Button type="submit" size="lg">
            Create
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
