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
  MultiSelect,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconPencil } from '@tabler/icons';
import { TimeInput } from '@mantine/dates';
// #endregion

// Services
// #region
import { createSittingAsync } from '../../Services/ApiServices';
import { getAreasAsync } from '../../Services/ApiServices';
// #endregion

// Models
// #region
import Sitting from '../../Models/Sitting';
import Area from '../../Models/Area';
// #endregion

interface CreateSittingModalProps {
  opened: boolean;
  onClose(): void;
  areaData: [Area];
}

export default function CreateSittingModal({
  opened,
  onClose,
  areaData,
}: CreateSittingModalProps) {
  const form = useForm({
    initialValues: {
      capacity: 50,
      type: '',
      startTime: '',
      endTime: '',
      venueId: 1,
      areas: [],
      reservations: [],
    },
    validate: {
      capacity: (value) => (value < 1 ? 'Please enter a valid capacity' : null),
      type: (value) => (value === '' ? 'Please enter a valid type' : null),
      startTime: (value) =>
        value === '' ? 'Please enter a valid start time' : null,
      endTime: (value) =>
        value === '' ? 'Please enter a valid end time' : null,
      areas: (value) =>
        value.length === 0 ? 'Please enter a valid area' : null,
    },
  });

  function onSubmit(values: any) {
    const sitting: Sitting = {
      capacity: values.capacity,
      type: values.type,
      startTime: values.startTime,
      endTime: values.endTime,
      venueId: values.venueId,
      areas: [values.areas],
      reservations: values.reservations,
    };
    createSittingAsync(sitting);
    console.log(sitting);
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
        <Box sx={{ maxWidth: 300 }} mx="auto" mt={20} mb={50}>
          <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
            <NumberInput
              required
              withAsterisk
              label="Capacity"
              placeholder=""
              icon={<IconPencil />}
              {...form.getInputProps('capacity')}
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
            <MultiSelect
              mt={20}
              mb={50}
              required
              withAsterisk
              label="Areas"
              placeholder=""
              data={areaData}
              {...form.getInputProps('areas')}
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
