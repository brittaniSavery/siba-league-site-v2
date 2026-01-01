import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import CollegeEvent from "./CollegeEvent";
import collegeEvents from "@assets/college-events.json";
import "@styles/college-calendar.scss";

export default function CollegeCalendar() {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      initialDate="2022-05-01"
      titleFormat={{ month: "long" }}
      validRange={{ start: "2022-05-01", end: "2023-04-30" }}
      navLinks={false}
      defaultAllDay={true}
      events={collegeEvents}
      eventContent={CollegeEvent}
      eventOrder="order,start,-duration,title"
      headerToolbar={{
        left: "prev",
        center: "title",
        right: "next",
      }}
    />
  );
}
