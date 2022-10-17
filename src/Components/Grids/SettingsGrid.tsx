import { SimpleGrid, Skeleton } from '@mantine/core';
import CreateAreaForm from '../Forms/CreateAreaForm';

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
      <CreateAreaForm />
    </SimpleGrid>
  );
}
