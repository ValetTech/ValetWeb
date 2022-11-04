export default interface Area {
  id?: number;
  name: string;
  description?: string;
  venueId?: number;
  tables?: Table[];
  sittings?: Sitting[];
  width?: number;
  height?: number;
}

export interface AreaSize {
  x: number;
  y: number;
}
