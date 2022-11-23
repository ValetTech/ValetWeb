import { Button, Modal } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CreateReservationModal from '../Components/Forms/CreateReservation';
import DetailsForm from '../Components/Forms/DetailsReservation';
import ReservationsTable from '../Components/Reservations/Table';
import Area from '../Models/Area';
import Reservation from '../Models/Reservation';
import Sitting from '../Models/Sitting';
import getReservationsAsync, {
  getAreasAsync,
  getSittingsAsync,
} from '../Services/ApiServices';

export default function Reservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [sittings, setSittings] = useState<Sitting[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
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

    async function fetchAreas() {
      const res: Area[] = await getAreasAsync();
      setAreas(res);
    }
    fetchAreas();
  }, []);

  function onCloseModal() {
    setModalOpened(false);
    setDetailsModalOpened(false);
  }

  function openDetailsModal() {
    setDetailsModalOpened(true);
  }

  return (
    <div className="px-4">
      <h1>Reservations</h1>
      <Button
        className="my-2 bg-[#FFB703]"
        // color="red"
        variant="outline"
        type="button"
        onClick={() => setModalOpened(true)}
      >
        Create reservation
      </Button>
      <Button
        className="m-2 bg-[#FFB703]"
        // color="red"
        variant="outline"
        type="button"
        component={Link}
        to="/calendar"
      >
        Create Sitting
      </Button>
      <ReservationsTable data={reservations} />
      <CreateReservationModal
        areaData={areas}
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
    </div>
  );
}
