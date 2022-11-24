/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-props-no-spreading */
import '@fullcalendar/react/dist/vdom';

import FullCalendar, {
  DateSelectArg,
  EventClickArg,
  EventHoveringArg,
  EventSourceInput,
} from '@fullcalendar/react';

import allLocales from '@fullcalendar/core/locales-all';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import rrulePlugin from '@fullcalendar/rrule';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Popover, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import dayjs from 'dayjs';
import { forwardRef, useEffect, useRef, useState } from 'react';
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

const MyComponent = forwardRef((props, ref) => (
  <div ref={ref} {...props}>
    <button onMouseEnter={props.onMouseEnter} onMouseLeave={props.onMouseLeave}>
      <Text>Click me</Text>
    </button>
  </div>
));

function EventPopover({ event, element }) {
  const [opened, { close, open }] = useDisclosure(false);
  const [eventInfo, setEventInfo] = useState<EventClickArg>();
  const ref = useRef();
  return (
    <Popover
      width={200}
      position="bottom"
      withArrow
      shadow="md"
      opened={opened}
    >
      <Popover.Target>
        <MyComponent
          props={{
            onMouseEnter: { open },
            onMouseLeave: { close },
            setEvent: { setEventInfo },
          }}
          ref={ref}
        />
      </Popover.Target>
      <Popover.Dropdown sx={{ pointerEvents: 'none' }}>
        <Text size="sm">
          This popover is shown when user hovers the target element{' '}
          {eventInfo?.event?.title}
        </Text>
      </Popover.Dropdown>
    </Popover>
  );
}

function RenderPopover() {
  const popoverRef = useRef();

  return (
    <Popover opened={opened} onClose={close} withArrow ref={popoverRef}>
      <Popover.Target>
        <div />
      </Popover.Target>

      <Popover.Dropdown>
        <div className="p-2">HELLO WORLD</div>
      </Popover.Dropdown>
    </Popover>
  );
}

export default function SittingsCalendar() {
  const [sittingData, setSittingData] = useState<Sitting[]>([]);
  const [events, setEvents] = useState<EventSourceInput>();
  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const [show, setShow] = useState(false);
  const [opened, { close, open }] = useDisclosure(false);
  const [popover, setPopover] = useState<Element | null>(null);
  const [element, setElement] = useState<Element | null>(null);

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

  function createEvents() {
    const sittings: EventSourceInput = sittingData.map((s) => ({
      id: s.id?.toString(),
      title: s.title ?? s.type,
      type: s.type,
      start: s.startTime,
      end: s.endTime,
      resourceIds: s.areas?.map((a) => a.id?.toString()) ?? [],
      groupId: s.groupId?.toString() ?? s.id?.toString(),
      editable: dayjs(s.endTime).isAfter(dayjs()),
      backgroundColor: s.areas?.length ? '#023047' : '#3f51b5',
      data: s,
    }));
    console.log('Sitting events', sittings);

    setEvents(sittings);
    return sittings;
  }

  function GetEvents() {
    getSittingsAsync()
      .then((data) => {
        setSittingData(data);
        return createEvents();
      })
      .catch((error) => {
        ErrorNotification(error);
      });
  }

  const handleClose = () => {
    setShow(false);
    setSelectedEvent(undefined);
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    getSittingsAsync()
      .then((sittings) => {
        setSittingData(sittings);
        createEvents();
        // setEvents(sittings.map((s) => s.toEvent()));
      })
      .catch(() => {
        ErrorNotification('Could not get sittings');
      });
    getAreasAsync()
      .then((res) => {
        console.log(
          'Areas',
          areas.map((area) => ({
            id: area?.id?.toString(),
            title: area?.name,
          }))
        );

        setAreas(res);
      })
      .catch((err) => {
        ErrorNotification(err.message);
      });
  }, []);

  function updateSitting(sitting: Sitting) {
    updateSittingAsync(sitting?.id ?? 0, sitting)
      .then((res) => {
        setSittingData([...sittingData, sitting]);
        createEvents();
      })
      .catch((err) => {
        ErrorNotification(err.message);
      });
  }

  useEffect(() => {
    console.log('Sitting data changed', sittingData);

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
      updateSitting({
        ...response,
        startTime: info.event.start,
        endTime: info.event.end,
      });
    });
  };

  const handleResize = (info) => {
    getSittingByIdAsync(info.event.id).then((response) => {
      updateSitting({
        ...response,
        startTime: info.event.start,
        endTime: info.event.end,
      });
    });
  };

  function handleMouseEnter({ event, el, jsEvent, view }: EventHoveringArg) {
    console.log('Event', event);
    console.log('Element', el);
    console.log('Event', jsEvent);
    console.log('View', view);
    setElement(el);
    // setPopover();

    // const Event = forwardRef((props, ref) => (
    //   <div ref={ref} {...props}>
    //     My component
    //   </div>
    // ));
    open();
  }

  function handleMouseLeave(info) {
    console.log('Mouse leave', info);
    close();
  }

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
        initialView="timeGridWeek"
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
        // events={GetEvents}
        events={events}
        select={handleSelect}
        eventClick={handleEventClick}
        eventMouseEnter={handleMouseEnter}
        eventMouseLeave={handleMouseLeave}
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
      <EventPopover event={selectedEvent} element={element} />
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
