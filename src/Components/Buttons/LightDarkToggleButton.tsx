import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons';

export default function LightDarkToggleButton() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <ActionIcon
      size="lg"
      variant="outline"
      color={dark ? 'yellow' : 'blue'}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
    >
      {dark ? <IconSun size={50} /> : <IconMoonStars size={50} />}
    </ActionIcon>
  );
}
