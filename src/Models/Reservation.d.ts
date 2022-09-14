export default interface Reservation {
  id?: number;
  customerId: number;
  customer?: Customer;
  sittingId: number;
  sitting?: Sitting;
  dateTime: Date;
  duration: number;
  noGuests: number;
  source?: string;
  tables?: Table[];
  status?: string;
  notes?: string;
}
