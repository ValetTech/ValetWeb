/* eslint-disable react/jsx-props-no-spreading */
import { Box, createStyles, Group, Radio, Text } from '@mantine/core';
import { useUncontrolled } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
  button: {
    display: 'flex',
    width: '100%',
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[3]
    }`,
    borderRadius: theme.radius.sm,
    padding: theme.spacing.md,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[9]
          : theme.colors.gray[0],
    },
  },
}));

interface CheckboxCardProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?(checked: boolean): void;
  title: React.ReactNode;
  input?: any;
  description: React.ReactNode;
  className?: string;
}

export default function CustomRadioButton({
  checked = false,
  defaultChecked = false,
  onChange = () => {},
  title,
  input = null,
  description,
  className = '',
}: // ...others
CheckboxCardProps) {
  const { classes, cx } = useStyles();

  const [value, handleChange] = useUncontrolled({
    value: checked,
    defaultValue: defaultChecked,
    finalValue: false,
    onChange,
  });

  return (
    <Box
      // {...others}
      onClick={() => handleChange(!value)}
      className={cx(classes.button, className, 'mb-0')}
    >
      <Group>
        <Radio
          checked={value}
          value={title?.toString() || 'default'}
          onChange={() => {}}
          tabIndex={-1}
          size="md"
          mr="xl"
        />
        <div>
          <Group>
            <Text weight={500} mb={7} sx={{ lineHeight: 1 }}>
              {title}
            </Text>
            {input}
          </Group>
          <Text size="sm" color="dimmed">
            {description}
          </Text>
        </div>
      </Group>
    </Box>
  );
}
