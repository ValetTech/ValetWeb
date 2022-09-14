export default interface Sitting {
  id: number;
  capacity: number;
  type: string;
  startTime: Date;
  endTime: Date;
  venueId: number;
  areas?: Area[];
  reservations?: Reservation[];
}
