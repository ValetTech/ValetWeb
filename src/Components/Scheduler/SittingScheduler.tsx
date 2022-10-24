// Components
// #region
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import '@fullcalendar/react/dist/vdom';
import { useEffect, useState } from 'react';
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
    async function fetchSittings() {
      const res: Sitting[] = await getSittingsAsync();
      setSittingData(res);
    }
    fetchSittings();
  }, []);

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
    createEvents();
  }, [sittingData]);

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
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      editable
      selectable
      events={events}
      select={handleSelect}
      initialView="timeGridWeek"
      headerToolbar={{
        start: 'today prev next',
        center: 'title',
        end: 'dayGridMonth dayGridWeek dayGridDay',
      }}
    />
  );
}
