export default interface Table {
  id?: number;
  type: string;
  capacity: number;
  areaId?: number;
  area?: Area;
  reservations?: Reservation[];
  xPosition?: number;
  yPosition?: number;
  position?: TablePosition;
}

export interface TablePosition {
  x: number;
  xSpan: number;
  y: number;
  ySpan: number;
}
