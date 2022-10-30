// import '@fullcalendar/react/dist/vdom';
import '@fullcalendar/react/dist/vdom';

import FullCalendar from '@fullcalendar/react';
// Components
// #region
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
// #endregion

// Services
// #region
import {
  getSittingsAsync,
  getSittingByIdAsync,
  updateSittingAsync,
} from '../../Services/ApiServices';
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
      const sittings: {
        id: number;
        type: string;
        startTime: string;
        endTime: string;
      }[] = sittingData.map((s) => ({
        id: s.id,
        title: s.type,
        start: s.startTime,
        end: s.endTime,
      }));
      setEvents(sittings);
    }
    createEvents();
  }, [sittingData]);

  const eventDrop = (info: any) => {
    getSittingByIdAsync(info.event.id).then((response) => {
      // updateSittingAsync(response.id, {
      //   id: info.event.id,
      //   capacity: response.capacity,
      //   type: response.type,
      //   startTime: info.event.start.toISOString(),
      //   endTime: info.event.end.toISOString(),
      //   venueId: response.venueId,
      // });
      console.log('DEETS', {
        id: info.event.id,
        capacity: response.capacity,
        type: response.type,
        startTime: info.event.start.toISOString(),
        endTime: info.event.end.toISOString(),
        venueId: response.venueId,
      });
    });
  };
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      editable
      selectable
      events={events}
      // select={handleSelect}
      eventDrop={eventDrop}
      initialView="timeGridWeek"
      headerToolbar={{
        start: 'today prev next',
        center: 'title',
        end: '',
      }}
      nowIndicator
    />
  );
}
