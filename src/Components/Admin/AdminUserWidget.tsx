// Components
// #region
import { useState } from 'react';
import {
  Button,
  Card,
  Container,
  Group,
  Select,
  SimpleGrid,
  Title,
} from '@mantine/core';
import UserTableStickyHeader from './UserTableStickyHeader';
import CreateUserModal from '../Forms/CreateUserModal';
// #endregion

// Models
// #region
// #endregion

// Services
// #region
import {} from '../../Services/ApiServices';
// #endregion

export default function AdminUserWidget() {
  const [createUserModalOpened, setCreateUserModalOpened] = useState(false);

  const userData = [
    {
      key: 1,
      name: 'Paul Boaden',
      role: 'Chef',
      phone: '0212345678',
    },
    {
      key: 2,
      name: 'Paul Boaden',
      role: 'Chef',
      phone: '0212345678',
    },
    {
      key: 3,
      name: 'Paul Boaden',
      role: 'Chef',
      phone: '0212345678',
    },
  ];

  return (
    <Container mt={6}>
      <Card withBorder radius="md">
        <Title size="h4" mb={10}>
          Users
        </Title>
        <UserTableStickyHeader data={userData} />
        <Group mt={20} position="left">
          <Button size="lg" onClick={() => setCreateUserModalOpened(true)}>
            Create
          </Button>
        </Group>
      </Card>
      <CreateUserModal
        opened={createUserModalOpened}
        onClose={() => setCreateUserModalOpened(false)}
      />
    </Container>
  );
}
