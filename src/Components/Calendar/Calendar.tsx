import FullCalendar, { EventSourceInput } from '@fullcalendar/react';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useEffect, useState } from 'react';
import Sitting from '../../Models/Sitting';
import { getSittingsAsync } from '../../Services/ApiServices';
import NewEventModal from './Event';

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

  //   handleDateSelect = (selectInfo) => {
  //     let title = prompt('Please enter a new title for your event');
  //     let calendarApi = selectInfo.view.calendar;

  //     calendarApi.unselect(); // clear date selection

  //     if (title) {
  //       calendarApi.addEvent({
  //         id: createEventId(),
  //         title,
  //         start: selectInfo.startStr,
  //         end: selectInfo.endStr,
  //         allDay: selectInfo.allDay,
  //       });
  //     }
  //   };

  //   handleEventClick = (clickInfo) => {
  //     if (
  //       confirm(
  //         `Are you sure you want to delete the event '${clickInfo.event.title}'`
  //       )
  //     ) {
  //       clickInfo.event.remove();
  //     }
  //   };

  //   handleEvents = (events) => {
  //     this.setState({
  //       currentEvents: events,
  //     });
  //   };

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        initialView="timeGridWeek"
        editable
        selectable
        selectMirror
        dayMaxEvents
        weekends
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
      <NewEventModal />
    </>
  );
}
