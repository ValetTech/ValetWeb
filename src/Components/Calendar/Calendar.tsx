/* eslint-disable react/jsx-no-bind */
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
import { useMediaQuery } from '@mantine/hooks';
import dayjs from 'dayjs';
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
  const matches = useMediaQuery('(min-width: 700px)');
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

  function RoundTime(date: Date) {
    return dayjs(date).minute(
      (Math.round(dayjs(date).minute() / 15) * 15) % 60
    );
  }

  function createEvents() {
    const sittings: EventSourceInput = sittingData.map((s) => ({
      id: s.id?.toString(),
      title: s.title ?? s.type,
      type: s.type,
      start: RoundTime(s.startTime).toDate(),
      end: RoundTime(s.endTime).toDate(),
      resourceIds: s.areas?.map((a) => a.id?.toString()) ?? [],
      groupId: s.groupId?.toString() ?? s.id?.toString(),
      editable: dayjs(s.endTime).isAfter(dayjs()),
      backgroundColor: s.areas?.length ? '#023047' : '#3f51b5',
      data: s,
    }));

    setEvents(sittings);
    return sittings;
  }

  function fetchEvents(info, successCallback, failureCallback) {
    getSittingsAsync({
      MinDateTime: dayjs(info.start).toISOString(),
      MaxDateTime: dayjs(info.end).toISOString(),
    })
      .then((response: Sitting[]) => {
        // setSittingData(response);
        const sittings = response.map((s) => ({
          id: s.id?.toString(),
          title: s.title ?? s.type,
          type: s.type,
          start: RoundTime(s.startTime).toDate(),
          end: RoundTime(s.endTime).toDate(),
          resourceIds: s.areas?.map((a) => a.id?.toString()) ?? [],
          groupId: s.groupId?.toString() ?? s.id?.toString(),
          editable: dayjs(s.endTime).isAfter(dayjs()),
          backgroundColor: s.areas?.length ? '#023047' : '#3f51b5',
          data: s,
        }));
        successCallback(sittings.slice());
      })
      .catch((e) => {
        ErrorNotification(e.message);
        failureCallback(e);
      });
  }

  // function GetEvents() {
  //   let sittings: EventSourceInput = [];
  //   getSittingsAsync()
  //     .then((data) => {
  //       sittings = data.map((s) => ({
  //         id: s.id?.toString(),
  //         title: s.title ?? s.type,
  //         type: s.type,
  //         start: RoundTime(s.startTime).toDate(),
  //         end: RoundTime(s.endTime).toDate(),
  //         resourceIds: s.areas?.map((a) => a.id?.toString()) ?? [],
  //         groupId: s.groupId?.toString() ?? s.id?.toString(),
  //         editable: dayjs(s.endTime).isAfter(dayjs()),
  //         backgroundColor: s.areas?.length ? '#023047' : '#3f51b5',
  //         data: s,
  //       }));
  //     })
  //     .catch((error) => {
  //       ErrorNotification(error.message);
  //     });

  //   setEvents(sittings);
  // }

  const handleClose = () => {
    setShow(false);
    setSelectedEvent(undefined);
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    // getSittingsAsync()
    //   .then((sittings) => {
    //     setSittingData(sittings);
    //     createEvents();
    //     // setEvents(sittings.map((s) => s.toEvent()));
    //   })
    //   .catch((err) => {
    //     ErrorNotification(err.message);
    //   });
    getAreasAsync()
      .then((res) => {
        setAreas(res);
      })
      .catch((err) => {
        ErrorNotification(err.message);
      });
  }, []);

  function updateSitting(sitting: Sitting) {
    getSittingByIdAsync(sitting?.id ?? 0).then((response) => {
      updateSittingAsync(sitting?.id ?? 0, {
        ...response,
        ...sitting,
        areaIds: sitting.areas?.map((a) => a.id),
      })
        .then(() => {})
        .catch((err) => {
          ErrorNotification(err.message);
        });
    });
    // GetEvents();
  }

  // useEffect(() => {
  //   createEvents();
  // }, [sittingData]);

  const handleSelect = (arg: DateSelectArg) => {
    // GetEvents();
    setSelectedEvent({ ...selectedEvent, ...arg });
    setShow(true);
  };

  function handleEventClick(arg: EventClickArg) {
    // GetEvents();
    setSelectedEvent({ ...selectedEvent, ...arg });
    setShow(true);
  }

  const handleDrop = (info) => {
    getSittingByIdAsync(info.event.id).then((response) => {
      updateSitting({
        ...response,
        startTime: RoundTime(info.event.start).toISOString(),
        endTime: RoundTime(info.event.end).toISOString(),
      });
    });
  };

  const handleResize = (info) => {
    getSittingByIdAsync(info.event.id).then((response) => {
      updateSitting({
        ...response,
        startTime: RoundTime(info.event.start).toISOString(),
        endTime: RoundTime(info.event.end).toISOString(),
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
        headerToolbar={
          matches
            ? {
                left: 'prev,today,next',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,resourceTimeGridDay',
              }
            : {
                left: 'prev,today,next',
                right: 'dayGridMonth,timeGridWeek,resourceTimeGridDay',
              }
        }
        eventColor="#023047"
        locales={allLocales}
        locale="en-au"
        droppable
        height="90%"
        initialView="timeGridWeek"
        editable
        eventResizableFromStart
        selectable
        selectAllow={(selectInfo) =>
          selectInfo.start >= dayjs().startOf('day').toDate()
        }
        selectMirror
        dayMaxEvents
        weekends
        nowIndicator
        businessHours={{
          daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
          startTime: '08:00',
          endTime: '24:00',
        }}
        firstDay={1}
        allDaySlot={false}
        dropAccept=".sitting"
        resources={areas.map((area) => ({
          id: area?.id?.toString(),
          title: area?.name,
        }))}
        // events={GetEvents}
        events={fetchEvents}
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
        // GetEvents={GetEvents}
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
