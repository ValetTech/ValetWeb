import '@fullcalendar/react/dist/vdom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

export default function SittingScheduler() {
  return <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />;
}
