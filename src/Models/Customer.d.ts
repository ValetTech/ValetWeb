export default interface Customer {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  reservations?: Reservation[];
  fullName?: string;
  isVip?: boolean;
}
