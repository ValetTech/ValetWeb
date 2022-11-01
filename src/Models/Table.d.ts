export default interface Table {
  id: number;
  type: string;
  capacity: number;
  areaId: number;
  position: TablePosition;
}

export interface TablePosition {
  x: number;
  xSpan: number;
  y: number;
  ySpan: number;
}
