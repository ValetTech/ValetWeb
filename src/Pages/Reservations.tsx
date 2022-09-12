import { useEffect, useState } from 'react';
import TableSort from '../Components/Reservation/Table';
import Reservation from '../Models/Reservation';
import getReservationsAsync from '../Services/ApiServices';

export default function Reservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  useEffect(() => {
    async function fetchReservations() {
      const res: Reservation[] = await getReservationsAsync();
      setReservations(res);
    }
    fetchReservations();
  }, []);

  return <TableSort data={reservations} />;
}
