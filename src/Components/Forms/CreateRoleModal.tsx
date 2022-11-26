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
  Checkbox,
  Group,
  Modal,
  Select,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
// #endregion
// #endregion

interface CreateRoleModalProps {
  opened: boolean;
  onClose(): void;
}

export default function CreateRoleModal({
  opened,
  onClose,
}: CreateRoleModalProps) {
  const form = useForm({
    initialValues: {
      roleType: '',
      isManager: false,
      venueId: 1,
    },
    validate: {},
  });

  function onSubmit() {
    onClose();
  }

  return (
    <Modal
      centered
      opened={opened}
      onClose={onClose}
      title="Create New Role"
      size="xl"
    >
      <Card radius="md" p="xl">
        <Title align="center">Create Role</Title>
        <Box sx={{ maxWidth: 300 }} mx="auto" mt={20}>
          <form onSubmit={form.onSubmit(onSubmit)}>
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
              <Button className="bg-[#FFB703]" mt={40} type="submit">
                Submit
              </Button>
            </Group>
          </form>
        </Box>
      </Card>
    </Modal>
  );
}
