// Components
// #region
import {
  createStyles,
  Group,
  Modal,
  ScrollArea,
  Table,
  Title,
  UnstyledButton,
  Text,
  SimpleGrid,
  Button,
} from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons';
import { useState } from 'react';
import UpdateAreaModal from '../Forms/UpdateAreaModal';
// #endregion

// Services
// #region
import { getAreaByIdAsync, deleteAreaAsync } from '../../Services/ApiServices';
// #endregion

// Models
// #region
import Area from '../../Models/Area';
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

interface TableScrollAreaProps {
  data: { key: number; name: string; description: string }[];
}

export default function AreaTableScrollArea({ data }: TableScrollAreaProps) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const [selectedArea, setSelectedArea] = useState();
  const [updateAreaModalOpened, setUpdateAreaModalOpened] = useState(false);
  const [deleteAreaModalOpened, setDeleteAreaModalOpened] = useState(false);

  const rows = data.map((row) => (
    <tr key={row.key}>
      <td>{row.name}</td>
      <td>{row.description}</td>
      <td>
        {/* Edit Button */}
        <UnstyledButton px={20}>
          <IconPencil
            size={20}
            stroke={1.5}
            onClick={() => {
              // Reservation ID is assigned as row key, so it is ok to use here for API call.
              getAreaByIdAsync(row.key)
                .then((response) => {
                  setSelectedArea(response);
                })
                .then(() => {
                  setUpdateAreaModalOpened(true);
                });
            }}
          />
        </UnstyledButton>
        <UnstyledButton px={20}>
          <IconTrash
            size={20}
            stroke={1.5}
            onClick={() => {
              // Reservation ID is assigned as row key, so it is ok to use here for API call.
              getAreaByIdAsync(row.key)
                .then((response) => {
                  setSelectedArea(response);
                })
                .then(() => {
                  setDeleteAreaModalOpened(true);
                });
            }}
          />
        </UnstyledButton>
        {/* Delete Confirmation Modal */}
        <Modal
          centered
          opened={deleteAreaModalOpened}
          onClose={() => setDeleteAreaModalOpened(false)}
        >
          <Group position="center">
            <Title size="h3">{selectedArea?.name}</Title>
            <Text italic size="lg">
              Are you sure you want to delete this area?
            </Text>
            <SimpleGrid cols={2}>
              <Button
                size="lg"
                color="red"
                onClick={() => {
                  deleteAreaAsync(selectedArea?.id);
                  setDeleteAreaModalOpened(false);
                }}
              >
                Confirm
              </Button>
              <Button size="lg" onClick={() => setDeleteAreaModalOpened(false)}>
                Cancel
              </Button>
            </SimpleGrid>
          </Group>
        </Modal>
      </td>
    </tr>
  ));

  return (
    <>
      <ScrollArea
        sx={{ height: 300 }}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table sx={{ minWidth: 720 }}>
          <thead
            className={cx(classes.header, { [classes.scrolled]: scrolled })}
          >
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
      <UpdateAreaModal
        areaData={selectedArea}
        opened={updateAreaModalOpened}
        onClose={() => {
          setUpdateAreaModalOpened(false);
        }}
      />
    </>
  );
}
