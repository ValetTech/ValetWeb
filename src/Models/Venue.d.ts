export default interface Venue {
  id: number;
  name: string;
  address: string;
  areas: Area[];
  sittings: Sitting[];
  reservations: Reservation[];
}
