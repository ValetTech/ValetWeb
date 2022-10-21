// Lint Rules
// #region
/* eslint-disable react/jsx-props-no-spreading */
// #endregion

// Components
// #region
import {
  Button,
  Card,
  Drawer,
  Group,
  List,
  Modal,
  NumberInput,
  Select,
  SimpleGrid,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useState } from 'react';
import { DatePicker, TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconPencil } from '@tabler/icons';
// #endregion

// Models
// #region
import Reservation from '../../Models/Reservation';
import Sitting from '../../Models/Sitting';
// #endregion

interface UpdateReservationModalProps {
  opened: boolean;
  onClose(): void;
  sittingData: Sitting[];
  reservationData: Reservation;
  //   reservation: Reservation;
}

export default function UpdateReservationModal({
  opened,
  onClose,
  sittingData,
  reservationData,
}: UpdateReservationModalProps) {
  const [datePickerValue, setDatePickerValue] = useState(new Date());
  const [timePickerValue, setTimePickerValue] = useState(new Date());

  const form = useForm({
    initialValues: {
      firstName: reservationData?.customer.firstName,
      lastName: reservationData?.customer.lastName,
      phone: reservationData?.customer.phone,
      email: reservationData?.customer.email,
      sittingId: reservationData?.sittingId,
      time: reservationData?.dateTime.substring(
        11,
        reservationData?.dateTime.length
      ),
      date: reservationData?.dateTime.substring(0, 9),
      duration: reservationData?.duration,
      noGuests: reservationData?.noGuests,
      notes: reservationData?.notes,
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
  const sittings: { label: string; value: number }[] = sittingData.map((s) => ({
    label: s.type,
    value: s.id,
  }));
  return (
    <Modal
      centered
      opened={opened}
      onClose={onClose}
      title="Update Reservation"
      size="xl"
    >
      <form
        onSubmit={form.onSubmit((values) => {
          console.log(values);
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
                    placeholder={reservationData?.customer.firstName}
                    label="First Name"
                    mt={20}
                    icon={<IconPencil />}
                    {...form.getInputProps('firstName')}
                  />
                  <TextInput
                    placeholder={reservationData?.customer.lastName}
                    label="Last Name"
                    mt={20}
                    icon={<IconPencil />}
                    {...form.getInputProps('lastName')}
                  />
                </>
                <>
                  <TextInput
                    placeholder={reservationData?.customer.phone}
                    label="Phone"
                    mt={20}
                    icon={<IconPencil />}
                    {...form.getInputProps('phone')}
                  />
                  <TextInput
                    placeholder={reservationData?.customer.email}
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
                {...form.getInputProps('sittingId')}
              />
              <TimeInput
                value={timePickerValue}
                onChange={timePickerValue}
                format="12"
                label="Time"
                mt={20}
                icon={<IconPencil />}
                {...form.getInputProps('time')}
              />
              <DatePicker
                value={datePickerValue}
                onChange={datePickerValue}
                label="Date"
                dropdownType="modal"
                mt={20}
                defaultValue={new Date()}
                {...form.getInputProps('date')}
              />
              <NumberInput
                placeholder={reservationData?.duration}
                label="Duration"
                mt={20}
                icon={<IconPencil />}
                {...form.getInputProps('duration')}
              />
              <NumberInput
                placeholder={reservationData?.noGuests}
                label="Number of Guests"
                mt={20}
                icon={<IconPencil />}
                {...form.getInputProps('noGuests')}
              />
              <Textarea
                placeholder={reservationData?.notes}
                autosize
                minRows={2}
                maxRows={4}
                label="Notes"
                mt={20}
                mb={20}
                icon={<IconPencil />}
                {...form.getInputProps('notes')}
              />
            </Card>
          </Group>
        </SimpleGrid>
        <Group mt={20} position="center">
          <Button type="submit" size="lg">
            Update
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
