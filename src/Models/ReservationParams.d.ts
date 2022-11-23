export default interface ReservationParams {
  MinDate?: string;
  MaxDate?: string;
  Date?: string;
  Duration?: number;
  Guests?: number;
  hasTables?: boolean;
  Id?: string;
  CustomerId?: string;
  SittingId?: string;
  Source?: string;
  Status?: string;
  Areas?: string;
  Sittings?: string;
  Customer?: string;
  Page?: number;
  Size?: number;
  SortBy?: string;
  SortOrder?: string;
  SearchTerm?: string;
}
