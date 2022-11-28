// Components
// #region
import {
  Button,
  createStyles,
  Group,
  Modal,
  ScrollArea,
  SimpleGrid,
  Table,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons';
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

interface RoleTableScrollAreaProps {
  data: { key: number; role: string }[];
}

export default function RoleTableScrollArea({
  data,
}: RoleTableScrollAreaProps) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const [deleteRoleModalOpened, setDeleteRoleModalOpened] = useState(false);

  const rows = data.map((row) => (
    <tr key={row.key}>
      <td>{row.role}</td>
      <td>
        {/* Edit Button */}
        <UnstyledButton pl={140}>
          <IconPencil size={20} stroke={1.5} />
        </UnstyledButton>
        {/* Delete Button */}
        <UnstyledButton pl={20} onClick={() => setDeleteRoleModalOpened(true)}>
          <IconTrash size={20} stroke={1.5} />
        </UnstyledButton>
        <Modal
          centered
          opened={deleteRoleModalOpened}
          onClose={() => setDeleteRoleModalOpened(false)}
        >
          <Group position="center">
            <Title size="h3">nameOfRole</Title>
            <Text italic size="lg">
              Are you sure you want to delete this role?
            </Text>
            <SimpleGrid cols={2}>
              <Button
                size="lg"
                color="red"
                onClick={() => {
                  setDeleteRoleModalOpened(false);
                }}
              >
                Confirm
              </Button>
              <Button size="lg" onClick={() => setDeleteRoleModalOpened(false)}>
                Cancel
              </Button>
            </SimpleGrid>
          </Group>
        </Modal>
      </td>
    </tr>
  ));

  return (
    <ScrollArea
      sx={{ height: 300 }}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table sx={{ minWidth: 300 }}>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>Role</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
