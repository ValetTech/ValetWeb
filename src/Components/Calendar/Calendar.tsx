import '@fullcalendar/react/dist/vdom';

import FullCalendar, { EventSourceInput } from '@fullcalendar/react';

import { DndContext, DragEndEvent } from '@dnd-kit/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useEffect, useState } from 'react';
import Sitting from '../../Models/Sitting';
import { getSittingsAsync } from '../../Services/ApiServices';
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
export default function SittingsCalendar() {
  const [sittingData, setSittingData] = useState<Sitting[]>([]);
  const [events, setEvents] = useState<EventSourceInput>();

  useEffect(() => {
    async function fetchSittings() {
      const res: Sitting[] = await getSittingsAsync();
      setSittingData(res);
    }
    fetchSittings();
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
        },
      ]);
    }
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
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            customButtons={{
              myCustomButton: {
                text: 'custom!',
                click: () => {
                  alert('clicked the custom button!');
                },
              },
            }}
            footerToolbar={{
              left: 'myCustomButton',
            }}
            droppable
            height="100%"
            initialView="timeGridWeek"
            editable
            selectable
            selectMirror
            dayMaxEvents
            weekends
            dropAccept=".sitting"
            drop={() => {
              alert('dropped!');
            }}
            // is the "remove after drop" checkbox checked?
            // if (checkbox.checked) {
            //   // if so, remove the element from the "Draggable Events" list
            //   info.draggedEl.parentNode.removeChild(info.draggedEl);
            // }
            events={events} // Add events
            //   select={this.handleDateSelect}
            //   eventContent={renderEventContent} // custom render function
            //   eventClick={this.handleEventClick}
            //   eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
        </Droppable>
        {/* <DefaultSittings /> */}
        {/* <NewEventModal /> */}
      </div>
    </DndContext>
  );
}
