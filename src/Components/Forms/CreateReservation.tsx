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
import Sitting from '../../Models/Sitting';
// #endregion

// Models
// #region
import Reservation from '../../Models/Reservation';
// #endregion

// Services
// #region
import {
  createCustomerAsync,
  createReservationAsync,
} from '../../Services/ApiServices';
// #endregion

// Props
// #region
interface ReservationModalProps {
  opened: boolean;
  onClose(): void;
  sittingData: Sitting[];
}

// #endregion

export default function ReservationModal({
  opened,
  onClose,
  sittingData,
}: ReservationModalProps) {
  // const [values, setValues] = useState();
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
      title="Create New Reservation"
      size="xl"
    >
      <form
        onSubmit={form.onSubmit((values) => {
          createCustomerAsync({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            phone: values.phone,
          }).then((customerResponse) => {
            console.log(customerResponse.data);
            createReservationAsync({
              customerId: customerResponse.data.id,
              sittingId: values.sittingId,
              dateTime: '2022-10-15T14:00:00',
              duration: values.duration,
              noGuests: values.noGuests,
              notes: values.notes,
            }).then((reservationResponse) => {
              console.log(reservationResponse.data);
            });
          });
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
            Create
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
