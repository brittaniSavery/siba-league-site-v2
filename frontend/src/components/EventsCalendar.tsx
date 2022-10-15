import { LEAGUE, RECRUITING } from "@content/constants";
import { CollegeEvent, ProEvent } from "@lib/global";
import "@styles/events-calendar.scss";
import { DateTime, Settings } from "luxon";
import { useMemo, useState } from "react";
import {
  Calendar,
  DateLocalizer,
  Formats,
  luxonLocalizer,
  Culture,
} from "react-big-calendar";

type EventsCalendarProps = {
  league: LEAGUE;
  events: Array<CollegeEvent | ProEvent>;
};

export default function EventsCalendar({
  league,
  events = [],
}: EventsCalendarProps) {
  //TODO: Add api call to change date to match Slack
  const currentDate = new Date(2022, 6, 4);
  const [calendarDate, setCalendarDate] = useState<Date>(currentDate);
  const { localizer } = useMemo(() => {
    Settings.defaultZone = import.meta.env.TIMEZONE;

    return {
      localizer: luxonLocalizer(DateTime),
    };
  }, []);

  const formats: Formats = useMemo(
    () => ({
      monthHeaderFormat: (
        date: Date,
        culture?: Culture,
        localizer?: DateLocalizer
      ): string => {
        return localizer.format(date, "LLLL");
      },
      agendaDateFormat: (
        date: Date,
        culture?: Culture,
        localizer?: DateLocalizer
      ): string => {
        return localizer.format(date, "LLL dd");
      },
      agendaHeaderFormat: (
        range: { start: Date; end: Date },
        culture?: string,
        localizer?: DateLocalizer
      ): string => {
        const startFormatted = localizer.format(range.start, "LLL dd");
        const endFormatted = localizer.format(range.end, "LLL dd");
        return `${startFormatted}–${endFormatted}`;
      },
    }),
    []
  );

  return (
    <>
      <div style={{ height: "80vh" }}>
        <Calendar
          popup
          localizer={localizer}
          date={calendarDate}
          events={events}
          formats={formats}
          views={["month", "agenda"]}
          length={7}
          min={DateTime.fromObject({ hour: 9 }).toJSDate()}
          eventPropGetter={(event) => getEventClass(league, event)}
          endAccessor={(event) => {
            let endDate = DateTime.fromJSDate(event.end);
            endDate = endDate.set({ hour: 23, minute: 59, second: 59 });

            return endDate.toJSDate();
          }}
          getNow={() => currentDate}
          onNavigate={(newDate) => {
            setCalendarDate(newDate);
          }}
          onRangeChange={(range: { start: Date; end: Date }) => {
            const endDate = DateTime.fromJSDate(range.end);
            const lastDay2022 = DateTime.fromISO("2022-12-31");
            const firstDay2022 = DateTime.fromISO("2022-01-01");
            const duration = lastDay2022.diff(endDate, "days").toObject().days;

            if (duration < -1) {
              setCalendarDate(firstDay2022.toJSDate());
            } else if (duration > 360) {
              setCalendarDate(lastDay2022.toJSDate());
            }
          }}
        />
      </div>
    </>
  );
}

function getEventClass(
  league: LEAGUE,
  event: CollegeEvent | ProEvent
): {
  className: string;
} {
  let className: string = null;

  if (league === LEAGUE.college) {
    const collegeEvent = event as CollegeEvent;

    if (collegeEvent.tournament) {
      className = "tournament";
    } else {
      switch (event.title) {
        case RECRUITING.Contact:
          className = "recruiting-contact";
          break;
        case RECRUITING.Dead:
          className = "recruiting-dead";
          break;
        case RECRUITING.EarlyLOI:
        case RECRUITING.LateLOI:
          className = "recruiting-loi";
          break;
        case RECRUITING.Evaluation:
          className = "recruiting-evaluation";
          break;
        case RECRUITING.None:
          className = "recruiting-none";
          break;
        case RECRUITING.Quiet:
          className = "recruiting-quiet";
          break;
      }
    }
  }

  return { className: className };
}
