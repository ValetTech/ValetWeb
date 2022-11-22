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
  Select,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconPencil } from '@tabler/icons';
// #endregion
// #endregion

interface UpdateUserModalProps {
  opened: boolean;
  onClose(): void;
}

export default function UpdateUserModal({
  opened,
  onClose,
}: UpdateUserModalProps) {
  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      phone: '',
      role: '',
      venueId: 1,
    },
    validate: {
      firstName: (value) =>
        value.length < 1 ? 'Please enter a valid first name' : null,
      lastName: (value) =>
        value.length < 1 ? 'Please enter a valid last name' : null,
      phone: (value) =>
        value.length < 10 ? 'Please enter a valid phone number' : null,
      role: (value) => (value.length < 10 ? 'Please enter a valid role' : null),
    },
  });

  function onSubmit(values: any) {
    onClose();
  }

  return (
    <Modal
      centered
      opened={opened}
      onClose={onClose}
      title="Update New User"
      size="xl"
    >
      <Card radius="md" p="xl">
        <Title align="center">Update User</Title>
        <Box sx={{ maxWidth: 300 }} mx="auto" mt={20}>
          <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
            <TextInput
              mt={20}
              withAsterisk
              label="First Name"
              icon={<IconPencil />}
              {...form.getInputProps('firstName')}
            />
            <TextInput
              mt={20}
              withAsterisk
              label="Last Name"
              icon={<IconPencil />}
              {...form.getInputProps('lastName')}
            />
            <TextInput
              mt={20}
              withAsterisk
              label="Phone"
              icon={<IconPencil />}
              {...form.getInputProps('phone')}
            />
            <Select
              mt={20}
              withAsterisk
              label="Role"
              placeholder=""
              data={[
                { value: 'role1', label: 'role1' },
                { value: 'role2', label: 'role2' },
                { value: 'role3', label: 'role3' },
                { value: 'role4', label: 'role4' },
              ]}
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
