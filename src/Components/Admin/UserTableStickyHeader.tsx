// Components
// #region
import {
  createStyles,
  ScrollArea,
  Select,
  Table,
  UnstyledButton,
} from '@mantine/core';
import { IconPencil, IconUserX } from '@tabler/icons';
import { useState } from 'react';
// #endregion

// Services
// #region
// #endregion

// Models
// #region
// #endregion

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

interface UserTableScrollAreaProps {
  data: { key: number; name: string; phone: string; role: string }[];
}

export default function UserTableScrollArea({
  data,
}: UserTableScrollAreaProps) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const rows = data.map((row) => (
    <tr key={row.key}>
      <td>{row.name}</td>
      <td>{row.phone}</td>
      <td>
        <Select
          placeholder="Current role"
          data={[
            { value: 'role1', label: 'role1' },
            { value: 'role2', label: 'role2' },
            { value: 'role3', label: 'role3' },
            { value: 'role4', label: 'role4' },
          ]}
        />
      </td>
      <td>
        {/* Edit Button */}
        <UnstyledButton pl={20}>
          <IconPencil size={20} stroke={1.5} />
        </UnstyledButton>
        <UnstyledButton pl={20}>
          <IconUserX size={20} stroke={1.5} />
        </UnstyledButton>
      </td>
    </tr>
  ));

  return (
    <ScrollArea
      sx={{ height: 300 }}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table sx={{ minWidth: 500 }}>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Role</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
