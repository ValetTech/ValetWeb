/* eslint-disable react/jsx-no-bind */
import {
  Button,
  Chip,
  Modal,
  ScrollArea,
  Select,
  Table,
  Tooltip,
} from '@mantine/core';
import dayjs from 'dayjs';
import { useState } from 'react';
import Reservation from '../../Models/Reservation';
import DetailsForm from '../Forms/DetailsReservation';

enum State {
  Pending,
  Confirmed,
  Cancelled,
  Assigned,
  Seated,
  Completed,
}
interface ReservationTableProps {
  reservations: Reservation[];
  UpdateReservation: (reservation: Reservation) => void;
}

export default function ReservationTable({
  reservations,
  UpdateReservation,
}: ReservationTableProps) {
  const [selectedReservation, setSelectedReservation] = useState<Reservation>();
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/;

  const rows = reservations.map((reservation) => (
    <tr key={reservation.id}>
      <td>
        <Tooltip label="Reservation Details" withArrow position="right">
          <Button
            compact
            variant="subtle"
            size="xs"
            className="py-0 m-0 h-7"
            onClick={() => {
              setSelectedReservation(reservation);
              setOpenDetailsModal(true);
            }}
          >
            {reservation.customer.fullName}
          </Button>
        </Tooltip>
      </td>
      <td>
        <Tooltip
          label={`Call ${reservation.customer.firstName}`}
          position="right"
          withArrow
        >
          <Button
            compact
            variant="subtle"
            size="xs"
            disabled={phoneRegex.test(reservation.customer.phone)}
            className="py-0 m-0 h-7"
          >
            {reservation.customer.phone}
          </Button>
        </Tooltip>
      </td>
      <td>{dayjs(reservation.dateTime).format('h:mma ddd, DD/MM/YY')}</td>
      <td>
        <Chip.Group spacing={0} className="">
          <Chip key={reservation.sitting.id} size="xs" className="mb-2 xs:mb-0">
            {reservation.sitting.type}
          </Chip>
          <Chip key={reservation.area.id} size="xs">
            {reservation.area.name}
          </Chip>
        </Chip.Group>
      </td>
      <td className="min-w-32">
        <Select
          data={Object.keys(State).filter((key) => Number.isNaN(Number(key)))}
          value={reservation.status}
          onChange={(value) =>
            UpdateReservation({ ...reservation, status: value ?? '' })
          }
        />
        {/* Edit Button */}
        {/* <UnstyledButton pl={20}>
              <IconPencil
                size={20}
                stroke={1.5}
                onClick={() => {
                  // Reservation ID is assigned as row key, so it is ok to use here for API call.
                  getReservationByIdAsync(row.id)
                    .then((response) => {
                      setSelectedReservation(response);
                    })
                    .then(() => {
                      setDetailsDrawerOpened(true);
                    });
                }}
              />
            </UnstyledButton> */}
      </td>
    </tr>
  ));

  function onClose() {
    setOpenDetailsModal(false);
  }

  return (
    <div className="w-full">
      <ScrollArea style={{ minHeight: 200 }} className="mt-4 w-full h-full">
        <Table
          sx={{ minWidth: 645 }}
          highlightOnHover
          className="table-auto w-full overflow-x:auto"
        >
          <thead className="">
            <tr>
              <th className="">Name</th>
              <th>Phone</th>
              <th>Time</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
      <Modal
        opened={openDetailsModal}
        onClose={() => setOpenDetailsModal(false)}
      >
        <DetailsForm
          reservationId={selectedReservation?.id ?? 0}
          onClose={onClose}
        />
      </Modal>
    </div>
  );
}
