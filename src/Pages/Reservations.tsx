import { Button, Modal } from '@mantine/core';
import { useEffect, useState } from 'react';
import DetailsForm from '../Components/Forms/DetailsReservation';
import ReservationModal from '../Components/Reservation/ReservationModal';
import TableSort from '../Components/Reservation/Table';
import Reservation from '../Models/Reservation';
import getReservationsAsync from '../Services/ApiServices';

export default function Reservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [modalOpened, setModalOpened] = useState(false);
  const [detailsModalOpened, setDetailsModalOpened] = useState(false);
  useEffect(() => {
    async function fetchReservations() {
      const res: Reservation[] = await getReservationsAsync();
      setReservations(res);
    }
    fetchReservations();
  }, []);

  function onCloseModal() {
    setModalOpened(false);
    setDetailsModalOpened(false);
  }

  function openDetailsModal() {
    setDetailsModalOpened(true);
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
      <Button
        className="m-2"
        // color="red"
        variant="outline"
        type="button"
        onClick={() => openDetailsModal()}
      >
        Reservation details
      </Button>
      <TableSort data={reservations} />
      <ReservationModal opened={modalOpened} onClose={() => onCloseModal()} />
      <Modal
        centered
        opened={detailsModalOpened}
        onClose={() => onCloseModal()}
        title="Create New Reservation"
      >
        <DetailsForm
          reservationId={1}
          opened={detailsModalOpened}
          onClose={() => onCloseModal()}
        />
      </Modal>
    </>
  );
}
