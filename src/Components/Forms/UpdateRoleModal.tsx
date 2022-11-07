// Lint Rules
// #region
/* eslint-disable react/jsx-props-no-spreading */
// #endregion

// Components
// #region
import {
  TextInput,
  Card,
  Button,
  Group,
  Box,
  Textarea,
  Title,
  Modal,
  Select,
  Checkbox,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconPencil } from '@tabler/icons';
// #endregion

// Services
// #region
// #endregion

// Models
// #region
import Area from '../../Models/Area';
// #endregion

interface CreateUserModalProps {
  opened: boolean;
  onClose(): void;
}

export default function CreateUserModal({
  opened,
  onClose,
}: CreateUserModalProps) {
  const form = useForm({
    initialValues: {
      roleType: '',
      isManager: false,
      venueId: 1,
    },
    validate: {},
  });

  function onSubmit(values: any) {
    onClose();
  }

  return (
    <Modal
      centered
      opened={opened}
      onClose={onClose}
      title="Update Role"
      size="xl"
    >
      <Card radius="md" p="xl">
        <Title align="center">Update Role</Title>
        <Box sx={{ maxWidth: 300 }} mx="auto" mt={20}>
          <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
            <Select
              mt={20}
              withAsterisk
              label="Role Type"
              placeholder=""
              data={[
                { value: 'role1', label: 'role1' },
                { value: 'role2', label: 'role2' },
                { value: 'role3', label: 'role3' },
                { value: 'role4', label: 'role4' },
              ]}
            />
            <Checkbox mt={60} label="Is Manager?" />
            <Group position="center" mt="md">
              <Button mt={40} type="submit">
                Submit
              </Button>
            </Group>
          </form>
        </Box>
      </Card>
    </Modal>
  );
}
