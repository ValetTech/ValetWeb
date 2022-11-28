export default interface SittingParams {
  Date?: string;
  MinDateTime?: string;
  MaxDateTime?: string;
  Capacity?: number;
  Title?: string;
  Type?: string;

  hasAreas?: boolean;
  hasReservations?: boolean;

  Areas?: string;
  Types?: string;

  Id?: string;
  Page?: number;
  Size?: number;
  SortBy?: string;
  SortOrder?: string;
  SearchTerm?: string;
}
