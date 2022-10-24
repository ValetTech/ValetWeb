// Components
// #region
import '@fullcalendar/react/dist/vdom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
// #endregion

// Services
// #region
import { getSittingsAsync } from '../../Services/ApiServices';
// #endregion

// Models
// #region
import Sitting from '../../Models/Sitting';
// #endregion

export default function SittingScheduler() {
  const [sittingData, setSittingData] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    function createEvents() {
      const sittings: { type: string; startTime: string; endTime: string }[] =
        sittingData.map((s) => ({
          title: s.type,
          start: s.startTime,
          end: s.endTime,
        }));
      setEvents(sittings);
    }
    async function fetchSittings() {
      const res: Sitting[] = await getSittingsAsync();
      setSittingData(res);
    }
    fetchSittings().then(() => {
      createEvents();
    });
  }, []);

  // const sittings: { name: string; startTime: string; endTime: string }[] =
  //   sittingData.map((s) => ({
  //     title: s.name,
  //     start: s.startTime,
  //     end: s.endTime,
  //   }));

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
