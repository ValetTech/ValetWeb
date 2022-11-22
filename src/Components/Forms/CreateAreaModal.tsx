// Lint Rules
// #region
/* eslint-disable react/jsx-props-no-spreading */
// #endregion

// Components
// #region
import {
  Box,
  Button,
  Card,
  Group,
  Modal,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconPencil } from '@tabler/icons';
// #endregion

// Services
// #region
import { createAreaAsync } from '../../Services/ApiServices';
// #endregion

// Models
// #region
import Area from '../../Models/Area';
// #endregion

interface CreateAreaModalProps {
  opened: boolean;
  onClose(): void;
}

export default function CreateAreaModal({
  opened,
  onClose,
}: CreateAreaModalProps) {
  const form = useForm({
    initialValues: {
      name: '',
      description: '',
      venueId: 1,
    },
    validate: {
      name: (value) => (value.length < 1 ? 'Please enter a valid name' : null),
      description: (value) =>
        value.length < 1 ? 'Please enter a valid description' : null,
    },
  });

  function onSubmit(values: any) {
    const area: Area = {
      name: values.name,
      description: values.description,
      venueId: values.venueId,
    };
    createAreaAsync(area);
    onClose();
  }

  return (
    <Modal
      centered
      opened={opened}
      onClose={onClose}
      title="Create New Area"
      size="xl"
    >
      <Card radius="md" p="xl">
        <Title align="center">Create Area</Title>
        <Box sx={{ maxWidth: 300 }} mx="auto" mt={20}>
          <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
            <TextInput
              withAsterisk
              label="Name"
              placeholder="Pick a distinctive name"
              icon={<IconPencil />}
              {...form.getInputProps('name')}
            />

            <Textarea
              withAsterisk
              autosize
              minRows={2}
              maxRows={4}
              label="Description"
              mt={20}
              mb={20}
              icon={<IconPencil />}
              {...form.getInputProps('description')}
            />
            <Group position="center" mt="md">
              <Button className="bg-[#FFB703]" type="submit">
                Submit
              </Button>
            </Group>
          </form>
        </Box>
      </Card>
    </Modal>
  );
}
