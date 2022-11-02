/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-no-bind */
import '@fullcalendar/react/dist/vdom';

import FullCalendar, { EventSourceInput } from '@fullcalendar/react';

import { DndContext, DragEndEvent } from '@dnd-kit/core';
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
import CreateEventModal from './CreateEventModal';
import Droppable from './Droppable';

interface EventObject {
  repeat: string;
  repeatEvery: number;
  repeatOn: string;
  repeatUntil: Date;
  repeatXTimes: number;
}
interface RecurringEvent {
  title: string; // name of event
  type: string;
  capacity: number;

  allDay: boolean;
  startTime: Date;
  endTime: Date;

  // Repeat
  repeat: string; // [none, daily, weekly, monthly]
  repeatEvery: number; // Every X [days, weeks, months, years]
  // Daily
  // Weekly
  repeatOn: number[]; // [days of week]

  // Monthly
  repeatOnDay: number; // [day of month]

  // Ends
  repeatUntil: Date; // Repeat until [date]
  repeatXTimes: number; // Repeat X times

  // Delete Sitting

  startRecur: Date;
  endRecur: Date;

  daysOfWeek: number[];

  groupId: number; // UUID
}
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

// function CustomRadioButton({
//   checked,
//   defaultChecked,
//   onChange,
//   title,
//   description,
//   className,
//   ...others
// }: any) {
//   const [value, handleChange] = useUncontrolled({
//     value: checked,
//     defaultValue: defaultChecked,
//     finalValue: false,
//     onChange,
//   });
//   return (
//     <UnstyledButton
//       {...others}
//       onClick={() => handleChange(!value)}
//       className={className}
//     >
//       <Radio
//         checked={value}
//         onChange={() => {}}
//         tabIndex={-1}
//         size="md"
//         mr="xl"
//         styles={{ input: { cursor: 'pointer' } }}
//       />

//       <div>
//         <Text weight={500} mb={7} sx={{ lineHeight: 1 }}>
//           {title}
//         </Text>
//         <Text size="sm" color="dimmed">
//           {description}
//         </Text>
//       </div>
//     </UnstyledButton>
//   );
// }
// function Calendar() {
//   const [events, setEvents] = useState<EventSourceInput[]>([]);
//   const [sittings, setSittings] = useState<Sitting[]>([]);
//   const [selectedEvent, setSelectedEvent] = useState<RecurringEvent>();
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     getSittingsAsync().then((sittings) => {
//       setSittings(sittings);
//       setEvents(sittings.map((s) => s.toEvent()));
//     });
//   }, []);

//   const handleEventClick = (event: any) => {
//     const sitting = sittings.find((s) => s.id === event.event.id);
//     if (sitting) {
//       setSelectedEvent(sitting.toRecurringEvent());
//       setShowModal(true);
//     }
//   };

//   const handleEventDrop = (event: DragEndEvent) => {
//     const sitting = sittings.find((s) => s.id === event.active.id);
//     if (sitting) {
//       const newSitting = sitting.clone();
//       newSitting.start = event.active.data.date;
//       newSitting.end = event.active.data.date;
//       newSitting.save();
//     }
//   };

//   const handleEventResize = (event: DragEndEvent) => {
//     const sitting = sittings.find((s) => s.id === event.active.id);
//     if (sitting) {
//       const newSitting = sitting.clone();
//       newSitting.end = event.active.data.date;
//       newSitting.save();
//     }
//   };

//   const handleEventAdd = (event: any) => {
//     const
// }

export default function SittingsCalendar() {
  const [sittingData, setSittingData] = useState<Sitting[]>([]);
  const [events, setEvents] = useState<EventSourceInput>();
  const [selectedEvent, setSelectedEvent] = useState<any>();
  const [show, setShow] = useState(false);
  const [areas, setAreas] = useState<Area[]>([
    {
      id: 1,
      name: 'Area 1',
      venueId: 1,
      size: {
        x: 10,
        y: 10,
      },
    },
    {
      id: 2,
      name: 'Area 2',
      venueId: 1,
      size: {
        x: 10,
        y: 10,
      },
    },
    {
      id: 3,
      name: 'Area 3',
      venueId: 1,
      size: {
        x: 10,
        y: 10,
      },
    },
  ]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    async function fetchSittings() {
      const res: Sitting[] = await getSittingsAsync();
      setSittingData(res);
    }
    fetchSittings();
    // get areas
    getAreasAsync()
      .then((res) => {
        setAreas(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    function createEvents() {
      const sittings = sittingData.map((s) => ({
        title: s.type,
        start: s.startTime,
        end: s.endTime,
      }));
      setEvents(sittings);
    }
    createEvents();
  }, [sittingData]);

  const handleSelect = (info: { start: Date; end: Date; resource: string }) => {
    const { start, end } = info;
    console.log('Resource', info.resource);

    setSelectedEvent({ ...selectedEvent, ...info });
    setShow(true);
  };

  function handleDragEnd(event: DragEndEvent) {
    const { over } = event;
    console.log('event', event);

    console.log('over', over);

    if (over?.id) {
      // eslint-disable-next-line no-new
      // new ThirdPartyDraggable(undefined, {
      //   itemSelector: '.draggable1',
      //   eventData: () => {
      //     console.log('SSSSSSSSSSSSSSSS');
      //     return {
      //       title: event.active?.data.current?.title ?? 'No title',
      //       duration: event.active?.data.current?.duration ?? '1:00',
      //     };
      //   },
      // });
    }

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
  }
  // function handleDragEnd(event: DragEndEvent) {
  //   const { active, over } = event;
  //   console.log('event', event);
  //   if (
  //     over &&
  //     over.data?.current?.accepts.includes(active.data?.current?.type)
  //   ) {
  //     // do stuff
  //   }
  // }

  const handleDrop = (info: any) => {
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

  const handleResize = (info: any) => {
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

  const sampleEvents = [
    {
      id: 1,
      title: 'event1',
      start: '2022-08-11T10:00:00',
      end: '2022-08-11T16:00:00',
    },
    {
      id: 2,
      title: 'event2',
      start: '2022-08-13T10:00:00',
      end: '2022-08-13T16:00:00',
    },
  ];

  return (
    // eslint-disable-next-line react/jsx-no-bind
    <DndContext onDragEnd={handleDragEnd}>
      <div className="w-full h-full pb-2 px-1 ml-0">
        <Droppable key={1} id="calendar">
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
            customButtons={{
              myCustomButton: {
                text: 'custom!',
                click: () => {
                  alert('clicked the custom button!');
                },
              },
            }}
            // footerToolbar={
            //   {
            //     // left: 'myCustomButton',
            //   }
            // }
            droppable
            height="100%"
            initialView="resourceTimeGridDay"
            editable
            selectable
            selectMirror
            dayMaxEvents
            weekends
            firstDay={1}
            allDaySlot={false}
            dropAccept=".sitting"
            drop={() => {
              alert('dropped!');
            }}
            // is the "remove after drop" checkbox checked?
            // if (checkbox.checked) {
            //   // if so, remove the element from the "Draggable Events" list
            //   info.draggedEl.parentNode.removeChild(info.draggedEl);
            // }
            resources={areas.map((area) => ({
              id: area?.id.toString(),
              title: area?.name,
            }))}
            events={events} // Add events
            //   eventContent={renderEventContent} // custom render function
            //   eventClick={this.handleEventClick}
            //   eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventChange={function(){}}
            eventRemove={function(){}}
            */
            select={handleSelect}
            // select={handleSelect}
            eventDrop={handleDrop}
            // eventResizeStop={eventResizeStop}
            eventResize={handleResize}
            // eventAdd={<CreateEventModal />}
          />
          {/* <NewEventModal /> */}
          <CreateEventModal
            show={show}
            handleShow={handleShow}
            handleClose={handleClose}
            event={selectedEvent}
            areas={areas}
          />
        </Droppable>
        {/* <DefaultSittings /> */}
        {/* <NewEventModal /> */}
        {/* <div className="flex flex-row flex-wrap">
          {sampleEvents.map((event) => (
            <Draggable key={event.id} id={event.id}>
              <div className="sitting bg-blue-500 text-white p-2 m-1 rounded">
                {event.title}
              </div>
            </Draggable>
          ))}
        </div> */}
      </div>
    </DndContext>
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
