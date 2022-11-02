export default interface Sitting {
  id?: number;
  title?: string;
  capacity: number;
  type: string;
  startTime: Date;
  endTime: Date;
  venueId: number;
  groupId?: number | string | null;
  areas?: Area[];
  reservations?: Reservation[];
}
