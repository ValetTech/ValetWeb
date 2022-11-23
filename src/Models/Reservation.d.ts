export default interface Reservation {
  id?: number;
  customerId: number;
  customer?: Customer;
  sittingId: number;
  sitting?: Sitting;
  areaId?: number;
  area?: Area;
  dateTime: string;
  duration: number;
  noGuests: number;
  source?: string;
  tables?: Table[];
  status?: string;
  notes?: string;
}
