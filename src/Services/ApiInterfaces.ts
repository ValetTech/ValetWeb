export default interface Reservation {
  id: number;
  customerId: number;
  customer: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    fullName: string;
  };
  sittingId: number;
  sitting: {
    id: number;
    capacity: number;
    type: string;
    startTime: string;
    endTime: string;
    venueId: number;
  };
  dateTime: string;
  duration: number;
  noGuests: number;
  source: number;
  venueId: number;
  tables: [];
  status: number;
  notes: string;
}
