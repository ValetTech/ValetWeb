// Components
import { useRef, useState } from 'react';
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
  Popover,
  Input,
  TextInput,
} from '@mantine/core';
import { IconPencil, IconCircleDotted, IconEditCircle } from '@tabler/icons';
// Services
import {
  getReservationByIdAsync,
  deleteReservationAsync,
  createCustomerAsync,
  createReservationAsync,
} from '../../Services/ApiServices';

// Interfaces
import { Reservation } from '../../Services/ApiInterfaces';

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
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [createModalOpened, setCreateModalOpened] = useState(false);

  // Update Reservation
  // #region
  const updateFirstName = useRef<HTMLInputElement>(null);
  const updateLastName = useRef<HTMLInputElement>(null);
  const updatePhone = useRef<HTMLInputElement>(null);
  const updateDateTime = useRef<HTMLInputElement>(null);
  const updateDuration = useRef<HTMLInputElement>(null);
  const updateNoGuests = useRef<HTMLInputElement>(null);
  const updateNotes = useRef<HTMLInputElement>(null);

  function UpdateDetails() {
    // Not sure if this is optimal but it works. There was an eslint
    // rule saying that you shouldn't use functions within jsx
    // components because of performance issues but for now
    // I am going to to keep things cleanish
    const updatedDetails = {
      id: drawerContent?.id,
      customerId: drawerContent?.customerId,
      customer: {
        id: drawerContent?.customer.id,
        firstName: updateFirstName.current.value,
        lastName: updateLastName.current.value,
        email: drawerContent?.customer.email,
        phone: updatePhone.current.value,
        fullName: drawerContent?.customer.fullName,
      },
      sittingId: drawerContent?.sittingId,
      sitting: {
        id: drawerContent?.sitting.id,
        capacity: drawerContent?.sitting.capacity,
        type: drawerContent?.sitting.type,
        startTime: drawerContent?.sitting.startTime,
        endTime: drawerContent?.sitting.endTime,
        venueId: drawerContent?.sitting.venueId,
      },
      dateTime: updateDateTime.current.value,
      duration: updateDuration.current.value,
      noGuests: updateNoGuests.current.value,
      source: drawerContent?.source,
      venueId: drawerContent?.venueId,
      tables: [],
      status: drawerContent?.status,
      notes: updateNotes.current.value,
    };
    setDrawerContent(updatedDetails);
  }
  // #endregion

  // Create Reservation
  // #region
  const createFirstName = useRef<HTMLInputElement>(null);
  const createLastName = useRef<HTMLInputElement>(null);
  const createPhone = useRef<HTMLInputElement>(null);
  const createEmail = useRef<HTMLInputElement>(null);
  const createDateTime = useRef<HTMLInputElement>(null);
  const createDuration = useRef<HTMLInputElement>(null);
  const createNoGuests = useRef<HTMLInputElement>(null);
  const createNotes = useRef<HTMLInputElement>(null);
  const createSittingId = useRef<HTMLInputElement>(null);

  function CreateReservation() {
    const newCustomer = {
      firstName: createFirstName.current.value,
      lastName: createLastName.current.value,
      email: createEmail.current.value,
      phone: createPhone.current.value,
      // dateTime: createDateTime.current.value,
      // duration: parseInt(createDuration.current.value, 16),
      // noGuests: parseInt(createNoGuests.current.value, 16),
      // notes: createNotes.current.value,
    };
    createCustomerAsync(newCustomer);
    alert('created');
  }
  // #endregion

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
            <Title align="center">
              Update Reservation
              <UnstyledButton
                onClick={() => {
                  setEditModalOpened(true);
                }}
              >
                <ThemeIcon ml={20} color="green" size={24} radius="xl">
                  <IconEditCircle size={18} />
                </ThemeIcon>
              </UnstyledButton>
            </Title>
            <Group position="center">
              <List
                mt={40}
                mr={180}
                spacing="md"
                size="lg"
                center
                icon={<IconCircleDotted />}
              >
                {/* Edit Details Model */}
                <Modal
                  title="Edit Reservation"
                  centered
                  opened={editModalOpened}
                  onClose={() => setEditModalOpened(false)}
                >
                  <TextInput
                    label="First Name"
                    ref={updateFirstName}
                    mt={20}
                    icon={<IconPencil />}
                    placeholder={drawerContent?.customer.firstName}
                  />
                  <TextInput
                    label="Last Name"
                    ref={updateLastName}
                    mt={20}
                    icon={<IconPencil />}
                    placeholder={drawerContent?.customer.lastName}
                  />
                  <TextInput
                    label="Phone"
                    ref={updatePhone}
                    mt={20}
                    icon={<IconPencil />}
                    placeholder={drawerContent?.customer.phone}
                  />
                  <TextInput
                    label="DateTime"
                    ref={updateDateTime}
                    mt={20}
                    icon={<IconPencil />}
                    placeholder={drawerContent?.dateTime}
                  />
                  <TextInput
                    label="Duration"
                    ref={updateDuration}
                    mt={20}
                    icon={<IconPencil />}
                    placeholder={drawerContent?.duration.toString()}
                  />
                  <TextInput
                    label="Number of Guests"
                    ref={updateNoGuests}
                    mt={20}
                    icon={<IconPencil />}
                    placeholder={drawerContent?.noGuests.toString()}
                  />
                  <TextInput
                    label="Notes"
                    ref={updateNotes}
                    mt={20}
                    icon={<IconPencil />}
                    placeholder={drawerContent?.notes}
                  />
                  <Group mt={20} position="center">
                    {/* eslint-disable-next-line react/jsx-no-bind */}
                    <Button
                      size="lg"
                      onClick={() => {
                        UpdateDetails();
                        setEditModalOpened(false);
                      }}
                    >
                      Confirm
                    </Button>
                  </Group>
                </Modal>
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
                <List.Item>
                  <Title size="h4">Duration:</Title>
                </List.Item>
                <Text italic ml={40} mb={20}>
                  {drawerContent?.duration} minutes
                </Text>
                <List.Item>
                  <Title size="h4">Number of guests</Title>
                </List.Item>
                <Text italic ml={40} mb={20}>
                  {drawerContent?.noGuests} covers
                </Text>
                <List.Item>
                  <Title size="h4">Notes</Title>
                </List.Item>
                <Text italic ml={40} mb={20}>
                  {drawerContent?.notes}
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
                      <Button
                        size="lg"
                        color="red"
                        onClick={() => {
                          deleteReservationAsync(drawerContent?.id);
                          setDeleteModalOpened(false);
                          setDrawerOpened(false);
                          window.location.reload();
                        }}
                      >
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
    <>
      <ScrollArea
        sx={{ height: 300 }}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table sx={{ minWidth: 350 }} highlightOnHover fontSize="lg">
          <thead
            className={cx(classes.header, { [classes.scrolled]: scrolled })}
          >
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
      <Button
        size="lg"
        radius="md"
        mt={20}
        onClick={() => {
          setCreateModalOpened(true);
        }}
      >
        Create Reservation
      </Button>
      {/* Create Reservation Modal */}
      <Modal
        title="Create Reservation"
        centered
        opened={createModalOpened}
        onClose={() => setCreateModalOpened(false)}
      >
        <TextInput
          ref={createFirstName}
          label="First Name"
          mt={20}
          icon={<IconPencil />}
        />
        <TextInput
          ref={createLastName}
          label="Last Name"
          mt={20}
          icon={<IconPencil />}
        />
        <TextInput
          ref={createPhone}
          label="Phone"
          mt={20}
          icon={<IconPencil />}
        />
        <TextInput
          ref={createEmail}
          label="Email"
          mt={20}
          icon={<IconPencil />}
        />
        <TextInput
          ref={createDateTime}
          label="DateTime"
          mt={20}
          icon={<IconPencil />}
        />
        <TextInput
          ref={createDuration}
          label="Duration"
          mt={20}
          icon={<IconPencil />}
        />
        <TextInput
          ref={createNoGuests}
          label="Number of Guests"
          mt={20}
          icon={<IconPencil />}
        />
        <TextInput
          ref={createNotes}
          label="Notes"
          mt={20}
          icon={<IconPencil />}
        />
        <TextInput
          ref={createSittingId}
          label="Sitting Id"
          mt={20}
          icon={<IconPencil />}
        />
        <Group mt={20} position="center">
          <Button
            size="lg"
            onClick={() => {
              CreateReservation();
            }}
          >
            Create
          </Button>
        </Group>
      </Modal>
    </>
  );
}
