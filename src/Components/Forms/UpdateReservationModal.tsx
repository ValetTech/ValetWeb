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
import { useEffect, useState } from 'react';
// #endregion

// Services
// #region
import {
  updateCustomerAsync,
  updateReservationAsync,
} from '../../Services/ApiServices';
// #endregion

// Models
// #region
import Reservation from '../../Models/Reservation';
import Sitting from '../../Models/Sitting';
import ErrorNotification from '../Notifications/NotifyError';
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

  function getDateTimeString() {
    // Sometimes the day is off sometimes not, haven't been able to isolate why yet.
    datePickerValue.setDate(datePickerValue.getDate() + 1);
    return `${
      datePickerValue.toISOString().split('T')[0]
    }T${timePickerValue.toLocaleTimeString('it-IT')}`;
  }

  const initialValues: Reservation = {
    id: 0,
    customerId: 0,
    customer: {
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    sittingId: 0,
    sitting: {
      id: 0,
      type: '',
      description: '',
      capacity: 0,
      price: 0,
    },
    dateTime: '',
    duration: 90,
    noGuests: 2,
    source: '',
    status: '',
    notes: '',
  };

  const form = useForm({
    // initialValues: {
    //   firstName: reservationData?.customer.firstName,
    //   lastName: reservationData?.customer.lastName,
    //   phone: reservationData?.customer.phone,
    //   email: reservationData?.customer.email,
    //   sittingId: reservationData?.sittingId,
    //   time: reservationData?.dateTime.substring(
    //     11,
    //     reservationData?.dateTime.length
    //   ),
    //   date: reservationData?.dateTime.substring(0, 9),
    //   duration: reservationData?.duration,
    //   noGuests: reservationData?.noGuests,
    //   notes: reservationData?.notes,
    // },
    initialValues,
    validate: {},
    // validate: {
    //   lastName: (value) =>
    //     value.length < 2 ? 'Please provide a valid first name' : null,
    //   phone: (value) =>
    //     value.length < 10 ? 'Please provide a valid phone number' : null,
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    //   noGuests: (value) =>
    //     value < 1 ? 'Please enter a valid number of guests' : null,
    // },
  });

  function onSubmit() {
    if (!form.isDirty()) {
      onClose();
      return;
    }
    const { values } = form;

    updateCustomerAsync(values.customer.id, {
      id: values.customer.id,
      firstName: values.customer.firstName,
      lastName: values.customer.lastName,
      email: values.customer.email,
      phone: values.customer.phone,
    }).then((res) => {
      if (!reservationData.id) return;
      console.log('update customer response', res);
      updateReservationAsync(reservationData.id, {
        id: reservationData.id,
        customerId: values.customer.id,
        sittingId: values.sittingId,
        dateTime: getDateTimeString(),
        duration: values.duration,
        noGuests: values.noGuests,
        notes: values.notes,
      })
        .then((reservationResponse) => {
          console.log(reservationResponse.data);
          onClose();
        })
        .catch((error) => {
          ErrorNotification(error.message);
        });
    });
  }

  useEffect(() => {
    if (reservationData) form.setValues(reservationData);
    console.log('SomeFUCKINGdata:', reservationData);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reservationData]);

  // Name of sitting will be displayed in select, but it will return the ID number.
  const sittings = sittingData.map((s) => ({
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
      <form onSubmit={onSubmit}>
        <SimpleGrid cols={1}>
          <Group position="center">
            <Card radius="md" p="xl">
              <Title color="dimmed" italic size="h5" align="center">
                CUSTOMER DETAILS
              </Title>
              <SimpleGrid cols={2}>
                <TextInput
                  placeholder={reservationData?.customer.firstName}
                  label="First Name"
                  mt={20}
                  icon={<IconPencil />}
                  {...form.getInputProps('customer.firstName')}
                />
                <TextInput
                  placeholder={reservationData?.customer.lastName}
                  label="Last Name"
                  mt={20}
                  icon={<IconPencil />}
                  {...form.getInputProps('customer.lastName')}
                />
                <TextInput
                  placeholder={reservationData?.customer.phone}
                  label="Phone"
                  mt={20}
                  icon={<IconPencil />}
                  {...form.getInputProps('customer.phone')}
                />
                <TextInput
                  placeholder={reservationData?.customer.email}
                  label="Email"
                  mt={20}
                  icon={<IconPencil />}
                  {...form.getInputProps('customer.email')}
                />
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
                {...form.getInputProps('dateTime')}
              />
              <DatePicker
                value={datePickerValue}
                onChange={datePickerValue}
                label="Date"
                dropdownType="modal"
                mt={20}
                defaultValue={new Date()}
                {...form.getInputProps('dateTime')}
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
