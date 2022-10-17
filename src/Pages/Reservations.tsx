import { Button, Modal } from '@mantine/core';
import { useEffect, useState } from 'react';
import DetailsForm from '../Components/Forms/DetailsReservation';
import CreateReservationModal from '../Components/Forms/CreateReservation';
import TableSort from '../Components/Reservations/Table';
import Reservation from '../Models/Reservation';
import getReservationsAsync, {
  getSittingsAsync,
} from '../Services/ApiServices';
import Sitting from '../Models/Sitting';

export default function Reservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [sittings, setSittings] = useState<Sitting[]>([]);
  const [modalOpened, setModalOpened] = useState(false);
  const [detailsModalOpened, setDetailsModalOpened] = useState(false);
  useEffect(() => {
    async function fetchReservations() {
      const res: Reservation[] = await getReservationsAsync();
      setReservations(res);
    }
    fetchReservations();

    async function fetchSittings() {
      const res: Sitting[] = await getSittingsAsync();
      setSittings(res);
    }
    fetchSittings();
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
      <CreateReservationModal
        sittingData={sittings}
        opened={modalOpened}
        onClose={() => onCloseModal()}
      />
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
