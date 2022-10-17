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
  //   reservation: Reservation;
}

export default function UpdateReservationModal({
  opened,
  onClose,
  sittingData,
}: UpdateReservationModalProps) {
  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      sittingId: 0,
      time: new Date(),
      date: new Date(),
      duration: 90,
      noGuests: 1,
      notes: '',
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
              <TimeInput
                format="12"
                label="Time"
                mt={20}
                icon={<IconPencil />}
                withAsterisk
                required
                defaultValue={new Date()}
                {...form.getInputProps('time')}
              />
              <DatePicker
                label="Date"
                dropdownType="modal"
                mt={20}
                withAsterisk
                required
                defaultValue={new Date()}
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
