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
import { updateSittingAsync, getAreasAsync } from '../../Services/ApiServices';
// #endregion

// Models
// #region
import Sitting from '../../Models/Sitting';
import Area from '../../Models/Area';
// #endregion

interface CreateSittingModalProps {
  opened: boolean;
  onClose(): void;
  sittingData: Sitting;
  areaData: [Area];
}

export default function UpdateSittingModal({
  opened,
  onClose,
  sittingData,
  areaData,
}: CreateSittingModalProps) {
  const form = useForm({
    initialValues: {
      capacity: sittingData?.capacity,
      type: sittingData?.type,
      startTime: sittingData?.startTime,
      endTime: sittingData?.endTime,
      venueId: 1,
      areas: sittingData?.areas,
      reservations: sittingData?.reservations,
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
    updateSittingAsync(sitting);
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
        <Title align="center">Update Sitting</Title>
        <Box sx={{ maxWidth: 300 }} mx="auto" mt={20}>
          <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
            <NumberInput
              required
              withAsterisk
              label="Capacity"
              placeholder={sittingData?.capacity}
              icon={<IconPencil />}
              {...form.getInputProps('capacity')}
            />
            <Select
              mt={20}
              required
              withAsterisk
              label="Type"
              placeholder={sittingData?.type}
              data={[
                { value: 'Breakfast', label: 'Breakfast' },
                { value: 'Lunch', label: 'Lunch' },
                { value: 'Dinner', label: 'Dinner' },
                { value: 'Special', label: 'Special' },
              ]}
              {...form.getInputProps('type')}
            />
            <TimeInput
              placeholder={sittingData?.startTime}
              format="12"
              label="Start Time"
              mt={20}
              icon={<IconPencil />}
              withAsterisk
              required
              {...form.getInputProps('startTime')}
            />
            <TimeInput
              placeholder={sittingData?.endTime}
              format="12"
              label="End Time"
              mt={20}
              icon={<IconPencil />}
              withAsterisk
              required
              {...form.getInputProps('endTime')}
            />
            <Select
              mt={20}
              required
              withAsterisk
              label="Areas"
              placeholder={sittingData?.areas}
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
