import { Group, SimpleGrid } from '@mantine/core';
import AdminUserWidget from '../Admin/AdminUserWidget';
import AdminRoleWidget from '../Admin/AdminRoleWidget';

export default function SettingsGrid() {
  return (
    <SimpleGrid
      cols={2}
      breakpoints={[
        { maxWidth: 'xs', cols: 1 },
        { maxWidth: 'sm', cols: 1 },
        { maxWidth: 'md', cols: 2 },
        { maxWidth: 'lg', cols: 2 },
        { maxWidth: 'xl', cols: 2 },
      ]}
    >
      <AdminUserWidget />
      <AdminRoleWidget />
    </SimpleGrid>
  );
}
