// Components
// #region
import {
  Button,
  Card,
  createStyles,
  Drawer,
  Group,
  List,
  Modal,
  ScrollArea,
  SimpleGrid,
  Table,
  Text,
  TextInput,
  NumberInput,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { TimeInput, DatePicker } from '@mantine/dates';
import { IconCircleDotted, IconEditCircle, IconPencil } from '@tabler/icons';
import { useRef, useState } from 'react';
// #endregion

// Services
// #region
import {
  createCustomerAsync,
  createReservationAsync,
  deleteReservationAsync,
  getReservationByIdAsync,
  updateReservationAsync,
  updateCustomerAsync,
} from '../../Services/ApiServices';
// #endregion

// Data Models
// #region
import Customer from '../../Models/Customer';
import Reservation from '../../Models/Reservation';
// #endregion

// Styles
// #region
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
// #endregion

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
  // In order to get the correct value for timeInput, state must be used. useRef will only return hours.
  // Be sure to use .toLocaleTimeString() on timeInputValue as we only need the time. The date will
  // be incorrect and we will concatenate correct one manually in validation stage.
  const [timeInputValue, setTimeInputValue] = useState(new Date());
  // Using state for the date input also seems better for formatting the value.
  const [dateInputValue, setDateInputValue] = useState(new Date());

  // Update Reservation Function
  // #region
  const updateFirstName = useRef<HTMLInputElement>(null);
  const updateLastName = useRef<HTMLInputElement>(null);
  const updateEmail = useRef<HTMLInputElement>(null);
  const updatePhone = useRef<HTMLInputElement>(null);
  const updateDateTime = useRef<HTMLInputElement>(null);
  const updateDuration = useRef<HTMLInputElement>(null);
  const updateNoGuests = useRef<HTMLInputElement>(null);
  const updateNotes = useRef<HTMLInputElement>(null);

  function UpdateDetails() {
    function getDateTimeString() {
      // This fuckery is required because the day was one day off.
      dateInputValue.setDate(dateInputValue.getDate() + 1);
      return `${
        dateInputValue.toISOString().split('T')[0]
      }T${timeInputValue.toLocaleTimeString()}`;
    }

    const updatedCustomerDetails = {
      id: drawerContent?.customerId,
      firstName: updateFirstName.current.value,
      lastName: updateLastName.current.value,
      email: updateEmail.current.value,
      phone: updatePhone.current.value,
    };

    const updatedReservationDetails = {
      id: drawerContent?.id,
      customerId: drawerContent?.customerId,
      sittingId: drawerContent?.sittingId,
      dateTime: getDateTimeString(),
      duration: parseInt(updateDuration.current?.value),
      noGuests: parseInt(updateNoGuests.current?.value),
      venueId: 1,
      notes: updateNotes.current.value,
    };

    console.log(' UPDATED DETAILS');
    console.log(updatedCustomerDetails);
    console.log(updatedReservationDetails);

    updateCustomerAsync(drawerContent?.customerId, updatedCustomerDetails);
    updateReservationAsync(drawerContent?.id, updatedReservationDetails);

    getReservationByIdAsync(drawerContent?.id).then((response) => {
      setDrawerContent(response.data);
    });

    setEditModalOpened(false);
    setDrawerOpened(false);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }
  // #endregion

  // Create Reservation Function
  // #region
  const createFirstName = useRef<HTMLInputElement>(null);
  const createLastName = useRef<HTMLInputElement>(null);
  const createPhone = useRef<HTMLInputElement>(null);
  const createEmail = useRef<HTMLInputElement>(null);
  const createDuration = useRef<HTMLInputElement>(null);
  const createNoGuests = useRef<HTMLInputElement>(null);
  const createNotes = useRef<HTMLInputElement>(null);
  const createSittingId = useRef<HTMLInputElement>(null);

  async function CreateReservation() {
    function getDateTimeString() {
      // This fuckery is required because the day was one day off.
      dateInputValue.setDate(dateInputValue.getDate() + 1);
      return `${
        dateInputValue.toISOString().split('T')[0]
      }T${timeInputValue.toLocaleTimeString()}`;
    }

    const newCustomer: Customer = {
      firstName: createFirstName.current.value,
      lastName: createLastName.current.value,
      email: createEmail.current.value,
      phone: createPhone.current.value,
    };
    console.log(newCustomer);

    await createCustomerAsync(newCustomer).then((createCustomerResponse) => {
      const customer = createCustomerResponse.data;

      const newReservation: Reservation = {
        customerId: customer.id,
        sittingId: parseInt(createSittingId.current.value),
        dateTime: getDateTimeString(),
        duration: parseInt(createDuration.current.value),
        noGuests: parseInt(createNoGuests.current.value),
        venueId: 1,
        notes: createNotes.current.value,
      };

      createReservationAsync(newReservation).then(
        (createReservationResponse) => {
          console.log(createReservationResponse.data);
        }
      );

      setCreateModalOpened(false);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    });
  }
  // #endregion

  // Reservation Table - Sticky header with scrollable list for displaying data.

  const rows = data.map((row) => (
    <tr key={row.fullName}>
      <td>{row.fullName}</td>
      <td>{row.phone}</td>
      <td>
        {row.dateTime}
        {/* Edit Button - Being rendered in-line next to datetime value. */}
        <UnstyledButton pl={20}>
          <IconPencil
            size={20}
            stroke={1.5}
            onClick={() => {
              setDrawerOpened(true);
              getReservationByIdAsync(row.id).then((response) => {
                setDrawerContent(response.data);
                console.log(response);
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
                    label="Email"
                    ref={updateEmail}
                    mt={20}
                    icon={<IconPencil />}
                    placeholder={drawerContent?.customer.email}
                  />
                  <TextInput
                    label="Phone"
                    ref={updatePhone}
                    mt={20}
                    icon={<IconPencil />}
                    placeholder={drawerContent?.customer.phone}
                  />
                  <TimeInput
                    format="12"
                    label="Time"
                    value={timeInputValue}
                    onChange={setTimeInputValue}
                    mt={20}
                    icon={<IconPencil />}
                    placeholder={drawerContent?.dateTime}
                  />
                  <DatePicker
                    value={dateInputValue}
                    onChange={setDateInputValue}
                    label="Date"
                    dropdownType="modal"
                    mt={20}
                  />
                  <NumberInput
                    label="Duration"
                    ref={updateDuration}
                    mt={20}
                    icon={<IconPencil />}
                    placeholder={drawerContent?.duration.toString()}
                  />
                  <NumberInput
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
                <Button
                  size="lg"
                  onClick={() => {
                    setEditModalOpened(true);
                  }}
                >
                  Update
                </Button>
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
                          setTimeout(() => {
                            window.location.reload();
                          }, 500);
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
        <TimeInput
          value={timeInputValue}
          onChange={setTimeInputValue}
          format="12"
          label="Time"
          mt={20}
          icon={<IconPencil />}
        />
        <DatePicker
          value={dateInputValue}
          onChange={setDateInputValue}
          label="Date"
          dropdownType="modal"
          mt={20}
        />
        <NumberInput
          ref={createDuration}
          label="Duration"
          mt={20}
          icon={<IconPencil />}
        />
        <NumberInput
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
        <NumberInput
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
