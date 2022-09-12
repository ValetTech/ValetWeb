export default interface Sitting {
  id: number;
  capacity: number;
  startTime: Date;
  endTime: Date;
  venueId: number;
  areas: Area[];
  reservations: Reservation[];
}
