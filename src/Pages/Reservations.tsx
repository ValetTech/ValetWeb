import { Button } from '@mantine/core';
import { useEffect, useState } from 'react';
import ReservationModal from '../Components/Reservation/ReservationModal';
import TableSort from '../Components/Reservation/Table';
import Reservation from '../Models/Reservation';
import getReservationsAsync from '../Services/ApiServices';

export default function Reservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [modalOpened, setModalOpened] = useState(false);
  useEffect(() => {
    async function fetchReservations() {
      const res: Reservation[] = await getReservationsAsync();
      setReservations(res);
    }
    fetchReservations();
  }, []);

  function onCloseModal() {
    setModalOpened(false);
  }

  return (
    <>
      <Button
        className="m-2"
        // color="red"
        variant="outline"
        type="button"
        onClick={() => setModalOpened(true)}
      >
        Create reservation
      </Button>
      <TableSort data={reservations} />
      <ReservationModal opened={modalOpened} onClose={() => onCloseModal()} />
    </>
  );
}
