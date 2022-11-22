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
import { updateAreaAsync } from '../../Services/ApiServices';
// #endregion

// Models
// #region
import Area from '../../Models/Area';
// #endregion

interface UpdateAreaModalProps {
  opened: boolean;
  onClose(): void;
  areaData: Area;
}

export default function UpdateAreaModal({
  opened,
  onClose,
  areaData,
}: UpdateAreaModalProps) {
  const form = useForm({
    initialValues: {
      name: areaData?.name,
      description: areaData?.description,
      venueId: 1,
    },
  });

  function onSubmit(values: any) {
    const area: Area = {
      id: areaData.id,
      name: values.name,
      description: values.description,
    };
    // If statements are required because the initial values in the form are undefined. This is because
    // when the modal renders the API hasn't been called yet and the values are undefined. This fixes that.
    // It's a design flaw but I don't know how to fix it right now other than this.
    if (area.name === undefined) {
      area.name = areaData.name;
    }
    if (area.description === undefined) {
      area.description = areaData.description;
    }
    updateAreaAsync(areaData.id, area);
    onClose();
    console.log(area);
  }

  return (
    <Modal
      centered
      opened={opened}
      onClose={onClose}
      title="Update Area"
      size="xl"
    >
      <Card radius="md" p="xl">
        <Title align="center">Update Area</Title>
        <Box sx={{ maxWidth: 300 }} mx="auto" mt={20}>
          <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
            <TextInput
              withAsterisk
              label="Name"
              placeholder={areaData?.name}
              icon={<IconPencil />}
              {...form.getInputProps('name')}
            />

            <Textarea
              withAsterisk
              autosize
              minRows={2}
              maxRows={4}
              label="Description"
              placeholder={areaData?.description}
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
