// Components
import { useState } from 'react';
import {
  createStyles,
  Table,
  Text,
  ScrollArea,
  UnstyledButton,
  Group,
  Drawer,
  Title,
  Card,
  List,
  ThemeIcon,
  Button,
  SimpleGrid,
  Modal,
} from '@mantine/core';
import { IconCircleCheck, IconPencil } from '@tabler/icons';
// Services
import { getReservationByIdAsync } from '../../Services/ApiServices';

// Interfaces
import Reservation from '../../Services/ApiInterfaces';

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
  data: { id: number; fullName: string; phone: string; dateTime: string }[];
}

export default function TableScrollArea({ data }: TableScrollAreaProps) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [drawerContent, setDrawerContent] = useState<Reservation>();
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);

  // Reservation Table
  const rows = data.map((row) => (
    <tr key={row.fullName}>
      <td>{row.fullName}</td>
      <td>{row.phone}</td>
      <td>
        {row.dateTime}
        {/* Edit Buttonn */}
        <UnstyledButton pl={20}>
          <IconPencil
            size={20}
            stroke={1.5}
            onClick={() => {
              setDrawerOpened(true);
              getReservationByIdAsync(row.id).then((response) => {
                setDrawerContent(response.data);
              });
            }}
          />
        </UnstyledButton>
        {/* Drawer that opens when edit button is clicked */}
        <Drawer
          opened={drawerOpened}
          onClose={() => setDrawerOpened(false)}
          padding="xl"
          size="full"
          position="top"
        >
          {/* Drawer content */}
          <Card withBorder radius="md">
            <Title align="center">Update Reservation</Title>
            <Group position="center">
              <List
                mt={40}
                mr={180}
                spacing="md"
                size="lg"
                center
                icon={
                  <ThemeIcon color="teal" size={24} radius="xl">
                    <IconCircleCheck size={16} />
                  </ThemeIcon>
                }
              >
                <List.Item>
                  <Title size="h4">First Name:</Title>
                </List.Item>
                <Text italic ml={40} mb={20}>
                  {drawerContent?.customer.firstName}
                </Text>
                <List.Item>
                  <Title size="h4">Last Name:</Title>
                </List.Item>
                <Text italic ml={40} mb={20}>
                  {drawerContent?.customer.lastName}
                </Text>
                <List.Item>
                  <Title size="h4">Phone:</Title>
                </List.Item>
                <Text italic ml={40} mb={20}>
                  {drawerContent?.customer.phone}
                </Text>
                <List.Item>
                  <Title size="h4">Booking Time:</Title>
                </List.Item>
                <Text italic ml={40} mb={20}>
                  {drawerContent?.dateTime}
                </Text>
              </List>
            </Group>
            <Group mt={20} position="center">
              <SimpleGrid cols={2}>
                <Button size="lg">Update</Button>
                <Button
                  color="red"
                  size="lg"
                  onClick={() => setDeleteModalOpened(true)}
                >
                  Delete
                </Button>
                {/* Delete Confirmation Modal */}
                <Modal
                  centered
                  opened={deleteModalOpened}
                  onClose={() => setDeleteModalOpened(false)}
                >
                  <Group position="center">
                    <Title size="h3">{drawerContent?.customer.fullName}</Title>
                    <Text italic size="lg">
                      Are you sure you want to delete this reservation?
                    </Text>
                    <SimpleGrid cols={2}>
                      <Button size="lg" color="red">
                        Confirm
                      </Button>
                      <Button
                        size="lg"
                        onClick={() => setDeleteModalOpened(false)}
                      >
                        Cancel
                      </Button>
                    </SimpleGrid>
                  </Group>
                </Modal>
              </SimpleGrid>
            </Group>
          </Card>
        </Drawer>
      </td>
    </tr>
  ));

  return (
    <ScrollArea
      sx={{ height: 300 }}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table sx={{ minWidth: 350 }} highlightOnHover fontSize="lg">
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
