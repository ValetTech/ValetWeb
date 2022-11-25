/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Center, Loader, Modal, TextInput } from '@mantine/core';
import { usePrevious } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CreateReservationModal from '../Components/Forms/CreateReservation';
import DetailsForm from '../Components/Forms/DetailsReservation';
import ErrorNotification from '../Components/Notifications/NotifyError';
import ReservationsTable from '../Components/Reservations/Table';
import Area from '../Models/Area';
import Reservation from '../Models/Reservation';
import ReservationParams from '../Models/ReservationParams';
import Sitting from '../Models/Sitting';
import getReservationsAsync, {
  getAreasAsync,
  getSittingsAsync,
} from '../Services/ApiServices';

export default function Reservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [sittings, setSittings] = useState<Sitting[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [params, setParams] = useState<ReservationParams>({});
  const previousParams = usePrevious(params);
  const [loading, setLoading] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [detailsModalOpened, setDetailsModalOpened] = useState<boolean>(false);
  const [search, setSearch] = useState('');
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

  function getReservations() {
    setLoading(true);
    const searchTerm = search.trim();
    getReservationsAsync({ ...params, Customer: searchTerm ?? undefined })
      .then((res) => {
        setReservations(res);
      })
      .catch((err) => {
        ErrorNotification(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    if (previousParams !== params) getReservations();
  }, [params]);

  useEffect(() => {
    getReservations();
  }, [search]);

  return (
    <div className=" mx-4">
      <h1>Reservations</h1>
      <div className="flex flex-row space-x-2 mb-3">
        <Button
          className="w-1/2 bg-[#FFB703]"
          // color="red"
          variant="outline"
          type="button"
          onClick={() => setModalOpened(true)}
        >
          Create Reservation
        </Button>
        <Button
          className="w-1/2 bg-[#FFB703]"
          // color="red"
          variant="outline"
          type="button"
          component={Link}
          to="/calendar"
        >
          Create Sitting
        </Button>
      </div>
      <div className="mb-2 ">
        <TextInput
          placeholder="Search by Customer Name"
          className=""
          icon={<IconSearch size={14} stroke={1.5} />}
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
        />
        {loading && (
          <Center className="mt-4">
            <Loader variant="dots" />
          </Center>
        )}
      </div>
      <ReservationsTable
        reservations={reservations}
        params={params}
        setParams={setParams}
      />
      <CreateReservationModal
        areasData={areas}
        sittingsData={sittings}
        opened={modalOpened}
        onClose={() => onCloseModal()}
      />

      <Modal
        centered
        opened={detailsModalOpened}
        onClose={() => onCloseModal()}
        title="Create New Reservation"
      >
        <DetailsForm reservationId={1} onClose={() => onCloseModal()} />
      </Modal>
    </div>
  );
}
