export interface Rrule {
  freq?: string;
  interval?: number;
  byweekday?: number[];
  until?: Date;
  count?: number;
}

export default interface Event {
  sitting: Sitting;
  rrule?: Rrule;
}

export interface Eventt {
  id?: number;

  groupId: number;
  start: Date;
  end: Date;
  daysOfWeek: number[];
  startTime: string;
  endTime: string;
  startRecur: Date;
  endRecur: Date;
  title: string;
  editable: boolean;
  startEditable;
  durationEditable;
  resourceEditable;
  resourceId;
  resourceIds;
  display;
  overlap;
  constraint;
  color;
  backgroundColor;
  borderColor;
  textColor;
  rrule;
  duration;
  daysOfWeek;
  startTime;
  endTime;
  startRecur;
  endRecur;
  groupId;
}

export interface EventInput {
  rrule: rrule;
  exdate: Date | Date[];
  exrule: rrule | rrule[];
  duration: number;
}
export interface SimpleEvent {
  daysOfWeek: number[];
  startTime: string;
  endTime: string;
  startRecur: Date;
  endRecur: Date;
  groupId: string;
  rrule: Rrule;
  duration: number;
}

export interface SittingEvent {
  id?: number;
  resourceId?: string | string[];
  start?: Date;
  end?: Date;
  title?: string;
  allDay?: boolean;
}

export interface RecurringEvent {
  daysOfWeek: number[];
  startTime: Date;
  endTime: Date;
  startRecur: Date;
  endRecur: Date;
  groupId: string;
  rruleDuration: string;
}
