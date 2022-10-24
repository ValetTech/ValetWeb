import FullCalendar from '@fullcalendar/react';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useEffect, useState } from 'react';
import Sitting from '../../Models/Sitting';

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
interface EventObject {
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  color: string;
  guests: number;
  location: string;
  notes: string;
  repeat: string;
  repeatEvery: number;
  repeatOn: string;
  repeatUntil: Date;
  repeatXTimes: number;
}

export default function SittingsCalendar() {
  const [sittings, setSittings] = useState<Sitting[]>([]);

  useEffect(() => {
    // API Call to get sittings
  }, []);

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
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      }}
      initialView="dayGridMonth"
      editable
      selectable
      selectMirror
      dayMaxEvents
      weekends
      events={[]} // Add events
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
  );
}
