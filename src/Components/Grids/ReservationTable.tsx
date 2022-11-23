import {
  Button,
  Chip,
  ScrollArea,
  Select,
  Table,
  Tooltip,
} from '@mantine/core';
import dayjs from 'dayjs';
import Reservation from '../../Models/Reservation';

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
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/;

  const rows = reservations.map((reservation) => (
    <tr key={reservation.id}>
      <td>{reservation.customer.fullName}</td>
      <td>
        <Tooltip label={`Call ${reservation.customer.firstName}`}>
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
        <Chip.Group spacing={0}>
          <Chip key={reservation.sitting.id} size="xs" className="mb-1">
            {reservation.sitting.type}
          </Chip>
          <Chip key={reservation.area.id} size="xs" className="mb-1">
            {reservation.area.name}
          </Chip>
        </Chip.Group>
      </td>
      <td>
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

  return (
    <ScrollArea style={{ minHeight: 200 }} className="mt-4 w-full h-full">
      <Table sx={{ minWidth: 220 }} className="w-full">
        <thead className="">
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Time</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
