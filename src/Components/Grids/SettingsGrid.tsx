import { Group, SimpleGrid } from '@mantine/core';
import SittingScheduler from '../Scheduler/SittingScheduler';
import AreaSettingsWidget from '../Settings/AreaSettingsWidget';
import SittingSettingsWidget from '../Settings/SittingSettingsWidget';

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
      <SittingScheduler />
      <Group spacing="xs">
        <SittingSettingsWidget />
        <AreaSettingsWidget />
      </Group>
    </SimpleGrid>
  );
}
