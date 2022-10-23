import '@fullcalendar/react/dist/vdom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function SittingScheduler() {
  const [events, setEvents] = useState([]);

  const handleSelect = (info: { start: any; end: any }) => {
    const { start, end } = info;
    const eventNamePrompt = prompt('Enter event name');
    if (eventNamePrompt) {
      setEvents([
        ...events,
        {
          start,
          end,
          title: eventNamePrompt,
          id: uuidv4(),
        },
      ]);
    }
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      editable
      selectable
      events={events}
      select={handleSelect}
      initialView="dayGridMonth"
      headerToolbar={{
        start: 'today prev next',
        center: 'title',
        end: 'dayGridMonth dayGridWeek dayGridDay',
      }}
    />
  );
}
