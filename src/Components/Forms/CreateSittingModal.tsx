// Lint Rules
// #region
/* eslint-disable react/jsx-props-no-spreading */
// #endregion

// Components
// #region
import {
  TextInput,
  Select,
  NumberInput,
  Card,
  Button,
  Group,
  Box,
  Textarea,
  Title,
  Modal,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconPencil } from '@tabler/icons';
import { TimeInput } from '@mantine/dates';
// #endregion

// Services
// #region
import { createSittingAsync } from '../../Services/ApiServices';
// #endregion

// Models
// #region
import Sitting from '../../Models/Sitting';
// #endregion

interface CreateSittingModalProps {
  opened: boolean;
  onClose(): void;
}

export default function CreateSittingModal({
  opened,
  onClose,
}: CreateSittingModalProps) {
  const form = useForm({
    initialValues: {
      capacity: 50,
      type: 'Breakfast',
      startTime: '',
      endTime: '',
      venueId: 1,
      areas: [],
      reservations: [],
    },
  });

  function onSubmit(values: any) {
    const sitting: Sitting = {
      capacity: values.capacity,
      type: values.type,
      startTime: values.startTime,
      endTime: values.endTime,
      venueId: values.venueId,
      areas: values.areas,
      reservations: values.reservations,
    };
    createSittingAsync(sitting);
    onClose();
  }

  return (
    <Modal
      centered
      opened={opened}
      onClose={onClose}
      title="Create New Sitting"
      size="xl"
    >
      <Card radius="md" p="xl">
        <Title align="center">Create Sitting</Title>
        <Box sx={{ maxWidth: 300 }} mx="auto" mt={20}>
          <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
            <NumberInput
              withAsterisk
              label="Capacity"
              placeholder=""
              icon={<IconPencil />}
              {...form.getInputProps('capacity')}
            />
            <Select
              label="Type"
              placeholder=""
              data={[
                { value: 'Breakfast', label: 'Breakfast' },
                { value: 'Lunch', label: 'Lunch' },
                { value: 'Dinner', label: 'Dinner' },
                { value: 'Special', label: 'Special' },
              ]}
            />
            <TimeInput
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
            />
            <Group position="center" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Box>
      </Card>
    </Modal>
  );
}
