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
import { useEffect } from 'react';
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
  const initialValues: Sitting = {
    capacity: 0,
    type: '',
    startTime: new Date(),
    endTime: new Date(),
    venueId: 1,
    areas: [],
    reservations: [],
  };

  const form = useForm({
    initialValues,
    validate: {},
  });

  function onSubmit() {
    if (!form.isDirty()) {
      onClose();
      return;
    }
    const { values } = form;

    const sitting: Sitting = {
      id: sittingData.id,
      capacity: values.capacity,
      type: values.type,
      startTime: values.startTime,
      endTime: values.endTime,
      venueId: values.venueId,
      areas: [values.areas],
      reservations: values.reservations,
    };
    updateSittingAsync(sitting.id, sitting);
    console.log('NEW SITTING', sitting);
    onClose();
  }

  useEffect(() => {
    if (sittingData) form.setValues(sittingData);
    console.log('SittingData:', sittingData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sittingData]);

  return (
    <Modal
      centered
      opened={opened}
      onClose={onClose}
      title="Update Sitting"
      size="xl"
    >
      <Card radius="md" p="xl">
        <Title align="center">Update Sitting</Title>
        <Box sx={{ maxWidth: 300 }} mx="auto" mt={20}>
          <form onSubmit={onSubmit}>
            <NumberInput
              label="Capacity"
              placeholder={sittingData?.capacity}
              icon={<IconPencil />}
              {...form.getInputProps('capacity')}
            />
            <Select
              mt={20}
              label="Type"
              placeholder={sittingData?.type}
              data={[
                { value: 'Breakfast', label: 'Breakfast' },
                { value: 'Lunch', label: 'Lunch' },
                { value: 'Dinner', label: 'Dinner' },
                { value: 'Special', label: 'Special' },
              ]}
              {...form.getInputProps('sitting.type')}
            />
            <TimeInput
              placeholder={sittingData?.startTime}
              format="12"
              label="Start Time"
              mt={20}
              icon={<IconPencil />}
              {...form.getInputProps('startTime')}
            />
            <TimeInput
              placeholder={sittingData?.endTime}
              format="12"
              label="End Time"
              mt={20}
              icon={<IconPencil />}
              {...form.getInputProps('endTime')}
            />
            <Select
              mt={20}
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
