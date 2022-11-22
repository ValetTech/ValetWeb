// Components
// #region
import { Button, Card, Container, Group, Title } from '@mantine/core';
import { useState } from 'react';
import CreateRoleModal from '../Forms/CreateRoleModal';
import RoleTableStickyHeader from './RoleTableStickyHeader';
// #endregion

// Models
// #region
// #endregion

// Services
// #region
import {} from '../../Services/ApiServices';
// #endregion

export default function AdminRoleWidget() {
  const [createRoleModalOpened, setCreateRoleModalOpened] = useState(false);

  const roleData = [
    {
      key: 1,
      role: 'Bartender',
    },
    {
      key: 2,
      role: 'Chef',
    },
    {
      key: 3,
      role: 'Security',
    },
  ];

  return (
    <Container mt={6}>
      <Card withBorder radius="md">
        <Title size="h4" mb={10}>
          Roles
        </Title>
        <RoleTableStickyHeader data={roleData} />
        <Group mt={20} position="left">
          <Button
            className="bg-[#FFB703]"
            size="lg"
            onClick={() => setCreateRoleModalOpened(true)}
          >
            Create
          </Button>
        </Group>
      </Card>
      <CreateRoleModal
        opened={createRoleModalOpened}
        onClose={() => setCreateRoleModalOpened(false)}
      />
    </Container>
  );
}
