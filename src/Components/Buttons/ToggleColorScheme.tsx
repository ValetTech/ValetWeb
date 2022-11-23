import { ActionIcon, Group, useMantineColorScheme } from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons';

export default function ToggleColor() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group spacing={0} position="center" className="bg-transparent">
      <ActionIcon
        onClick={() => toggleColorScheme()}
        size="xl"
        sx={(theme) => ({
          borderRadius: theme.radius.md,
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[5]
              : theme.colors.gray[0],
          color: theme.colorScheme === 'dark' ? '#FFB703' : '#FFB703',
          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark' ? '#163c5e' : '#163c5e',
          },
        })}
      >
        {colorScheme === 'dark' ? (
          <IconSun size={24} />
        ) : (
          <IconMoonStars size={24} />
        )}
      </ActionIcon>
    </Group>
  );
}
