/* eslint-disable react/jsx-props-no-spreading */
import { Button, Group, NumberInput, Textarea, TextInput } from '@mantine/core';
import { DatePicker, TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconCalendar, IconClock } from '@tabler/icons';
import { useEffect, useState } from 'react';
import Reservation from '../../Models/Reservation';
import {
  deleteReservationAsync,
  getReservationByIdAsync,
  updateReservationAsync,
} from '../../Services/ApiServices';
import DeletedNotification from '../Notifications/NotifyDelete';
import ErrorNotification from '../Notifications/NotifyError';
import UpdatedNotification from '../Notifications/NotifyUpdate';

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
  dateTime: new Date('1970-01-01T00:00'),
  duration: 90,
  noGuests: 2,
  source: '',
  status: '',
  notes: '',
};

interface ReservationModalProps {
  opened: boolean;
  onClose(): void;
  reservationId: number;
}

export default function DetailsForm({
  opened,
  onClose,
  reservationId,
}: ReservationModalProps) {
  const [values, setValues] = useState({ ...initialValues });
  const [edit, setEdit] = useState(false);
  const form = useForm<Reservation>({ initialValues });

  useEffect(() => {
    getReservationByIdAsync(reservationId)
      .then(({ data }: { data: Reservation }) => {
        const res = { ...data, dateTime: new Date(data.dateTime) };
        setValues(res);
        form.setValues(res);
      })
      .catch((error) => {
        onClose();
        ErrorNotification(error.message);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleCancel() {
    form.setValues(values);
    setEdit(false);
  }

  function handleSave() {
    if (!form.isDirty()) {
      onClose();
      UpdatedNotification();
      return;
    }

    const { customer, sitting, ...request } = form.values;
    // Update reservation
    updateReservationAsync(reservationId, request)
      .then(() => {
        // setValues(form.values);
        // setEdit(false);
        onClose();
        UpdatedNotification();
      })
      .catch((error) => {
        ErrorNotification(error.message);
      });
  }

  function handleDelete() {
    // Delete reservation by id
    deleteReservationAsync(reservationId)
      .then(() => {
        DeletedNotification();
      })
      .catch((error) => {
        ErrorNotification(error.message);
      });
    // Close modal
    onClose();
    // Refresh reservations
  }

  function onSubmit(value: any) {
    console.log(value);

    handleSave();
  }

  return (
    <form onSubmit={onSubmit}>
      <NumberInput
        label="Customer ID"
        hideControls
        disabled={!edit}
        {...form.getInputProps('customerId')}
      />
      <TextInput
        label="Customer"
        disabled
        {...form.getInputProps('customer.fullName')}
      />
      <NumberInput
        label="Sitting ID"
        hideControls
        disabled={!edit}
        {...form.getInputProps('sittingId')}
      />
      <TextInput
        label="Sitting"
        disabled
        {...form.getInputProps('sitting.type')}
      />
      <DatePicker
        label="Reservation date"
        icon={<IconCalendar size={16} />}
        disabled={!edit}
        {...form.getInputProps('dateTime')}
      />
      <TimeInput
        icon={<IconClock size={16} />}
        label="Pick time"
        format="12"
        disabled={!edit}
        // value={new Date(form.values.dateTime)}
        {...form.getInputProps('dateTime')}
      />
      <NumberInput
        label="Duration (minutes)"
        hideControls
        disabled={!edit}
        {...form.getInputProps('duration')}
      />
      <NumberInput
        label="Number of guests"
        disabled={!edit}
        {...form.getInputProps('noGuests')}
      />
      <Textarea
        placeholder="Notes"
        autosize
        minRows={2}
        maxRows={4}
        label="Additional Notes"
        disabled={!edit}
        {...form.getInputProps('notes')}
      />
      <Group position="right" mt="md">
        {edit ? (
          <Button
            className="bg-[#FFB703]"
            variant="subtle"
            onClick={() => handleCancel()}
          >
            Cancel
          </Button>
        ) : (
          <Button
            className="bg-[#FFB703]"
            variant="filled"
            onClick={() => setEdit(true)}
          >
            Edit
          </Button>
        )}
        {edit ? (
          <Button
            className="bg-[#FFB703]"
            variant="filled"
            type="submit"
            onClick={() => handleSave()}
          >
            Save
          </Button>
        ) : (
          <Button
            variant="outline"
            color="red"
            className="bg-[#FFB703]"
            type="submit"
            onClick={() => handleDelete()}
          >
            Delete
          </Button>
        )}
      </Group>
    </form>
  );
}
