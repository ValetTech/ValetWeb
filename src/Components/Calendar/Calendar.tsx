/* eslint-disable react/jsx-props-no-spreading */
import '@fullcalendar/react/dist/vdom';

import FullCalendar, {
  DateSelectArg,
  EventClickArg,
  EventSourceInput,
} from '@fullcalendar/react';

import allLocales from '@fullcalendar/core/locales-all';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import rrulePlugin from '@fullcalendar/rrule';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useEffect, useState } from 'react';
import Area from '../../Models/Area';
import Sitting from '../../Models/Sitting';
import {
  getAreasAsync,
  getSittingByIdAsync,
  getSittingsAsync,
  updateSittingAsync,
} from '../../Services/ApiServices';
import ErrorNotification from '../Notifications/NotifyError';
import CreateEventModal from './CreateEventModal';

/* CALENDAR
New event
- Title
- Time
- Guests
- Location
- Notes
- All day
- Repeat
- Color


Recurrence
- Repeat every X - [days, weeks, months, years]
- Repeat on [days of week]
- Repeat until [date]
- Repeat X times


*/

export default function SittingsCalendar() {
  const [sittingData, setSittingData] = useState<Sitting[]>([]);
  const [events, setEvents] = useState<EventSourceInput>();
  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const [show, setShow] = useState(false);

  const [areas, setAreas] = useState<Area[]>([
    {
      id: 1,
      name: 'Main',
      venueId: 1,
      width: 10,
      height: 10,
    },
    {
      id: 2,
      name: 'Outside',
      venueId: 1,
      width: 10,
      height: 10,
    },
    {
      id: 3,
      name: 'Balcony',
      venueId: 1,
      width: 10,
      height: 10,
    },
  ]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getSittingsAsync()
      .then((sittings) => {
        setSittingData(sittings);
        // setEvents(sittings.map((s) => s.toEvent()));
      })
      .catch(() => {
        ErrorNotification('Could not get sittings');
      });
    getAreasAsync()
      .then((res) => {
        setAreas(res);
      })
      .catch((err) => {
        ErrorNotification(err.message);
      });
  }, []);

  useEffect(() => {
    function createEvents() {
      const sittings: EventSourceInput = sittingData.map((s) => ({
        id: s.id?.toString(),
        title: s.type,
        type: s.type,
        start: s.startTime,
        end: s.endTime,
        resourceIds: s.areas?.map((a) => a.id.toString()) ?? [],
        groupId: s.groupId?.toString() ?? s.id?.toString(),
        data: s,
      }));
      setEvents(sittings);
    }
    createEvents();
  }, [sittingData]);

  const handleSelect = (arg: DateSelectArg) => {
    setSelectedEvent({ ...selectedEvent, ...arg });
    setShow(true);
  };

  function handleEventClick(arg: EventClickArg) {
    setSelectedEvent({ ...selectedEvent, ...arg });
    setShow(true);
  }

  const handleDrop = (info) => {
    getSittingByIdAsync(info.event.id).then((response) => {
      updateSittingAsync(response.id, {
        id: info.event.id,
        capacity: response.capacity,
        type: response.type,
        startTime: info.event.start,
        endTime: info.event.end,
        venueId: response.venueId,
      });
    });
  };

  const handleResize = (info) => {
    getSittingByIdAsync(info.event.id).then((response) => {
      updateSittingAsync(response.id, {
        id: info.event.id,
        capacity: response.capacity,
        type: response.type,
        startTime: info.event.start,
        endTime: info.event.end,
        venueId: response.venueId,
      });
    });
  };

  return (
    <div className="w-full h-full pb-2 px-1 ml-0 ">
      <FullCalendar
        schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
        plugins={[
          rrulePlugin,
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
          resourceTimeGridPlugin,
          resourceTimelinePlugin,
        ]}
        headerToolbar={{
          left: 'title',
          center: 'prev,today,next',
          right: 'dayGridMonth,timeGridWeek,resourceTimeGridDay',
        }}
        eventColor="#023047"
        locales={allLocales}
        locale="en-au"
        droppable
        height="90%"
        initialView="resourceTimeGridDay"
        editable
        eventResizableFromStart
        selectable
        selectMirror
        dayMaxEvents
        weekends
        firstDay={1}
        allDaySlot={false}
        dropAccept=".sitting"
        resources={areas.map((area) => ({
          id: area?.id?.toString(),
          title: area?.name,
        }))}
        events={events}
        select={handleSelect}
        eventClick={handleEventClick}
        eventDrop={handleDrop}
        eventResize={handleResize}
      />
      <CreateEventModal
        show={show}
        handleShow={handleShow}
        handleClose={handleClose}
        event={selectedEvent}
        setEvent={setSelectedEvent}
        areas={areas}
      />
    </div>
  );
}

/*
[
  {
    "id": 0,
    "capacity": 0,
    "type": "Breakfast",
    "startTime": "2022-11-02T01:13:28.943Z",
    "endTime": "2022-11-02T01:13:28.943Z",
    "venueId": 0,
    "areas": [
    ],
  }
]
*/
