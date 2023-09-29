import { LEAGUE, RECRUITING_STATES } from "@content/constants";
import CollegeEvents from "@content/rules/collegeDates";
import ProEvents from "@content/rules/proDates";
import type {
  CollegeEvent,
  ProEvent,
  StrapiSimDates,
  StrapiSingleTypeResponse,
} from "@lib/types";
import { getDataFromApi } from "@lib/utils";
import "@styles/events-calendar.scss";
import {
  addDays,
  differenceInDays,
  format,
  getDay,
  parse,
  startOfWeek,
} from "date-fns";
import enUS from "date-fns/locale/en-US/index.js";
import { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  dateFnsLocalizer,
  DateFormat,
  Formats,
} from "react-big-calendar";

type EventsCalendarProps = {
  league: LEAGUE;
};

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function EventsCalendar({ league }: EventsCalendarProps) {
  const [calendarDate, setCalendarDate] = useState<Date>();
  const [simDate, setSimDate] = useState<Date>(new Date());
  const events = league === LEAGUE.college ? CollegeEvents : ProEvents;

  useEffect(() => {
    const url = `${
      import.meta.env.PUBLIC_CMS_URL
    }/sim-date?fields[0]=${league}`;

    getDataFromApi<StrapiSingleTypeResponse<StrapiSimDates>>(url).then(
      (strapiInfo) => {
        const simDate =
          league === LEAGUE.college
            ? strapiInfo.data.attributes.college
            : strapiInfo.data.attributes.pro;

        setSimDate(new Date(`${simDate}T00:00:00`));
      }
    );
  }, []);

  const EventCalendar = Calendar<CollegeEvent | ProEvent>;
  const formats: Formats = useMemo(
    () => ({
      monthHeaderFormat: (date, culture, localizer) => {
        if (!localizer) {
          return "";
        }

        const format: DateFormat = localizer?.format(date, "LLLL");
        return format;
      },
      agendaDateFormat: (date, culture, localizer) => {
        if (!localizer) {
          return "";
        }

        const format: DateFormat = localizer?.format(date, "LLL dd");
        return format;
      },
      agendaHeaderFormat: (range, culture, localizer) => {
        if (!localizer) {
          return "";
        }

        const startFormatted = localizer.format(range.start, "LLL dd");
        const endFormatted = localizer.format(range.end, "LLL dd");
        return `${startFormatted}–${endFormatted}`;
      },
    }),
    []
  );

  return (
    <div style={{ height: "80vh" }}>
      <EventCalendar
        popup
        localizer={localizer}
        date={calendarDate}
        events={events}
        formats={formats}
        views={["month", "agenda"]}
        length={7}
        eventPropGetter={(event) => getEventClass(league, event)}
        endAccessor={(event) => {
          const endDate = event.end as Date;
          return addDays(endDate, 1);
        }}
        getNow={() => simDate}
        onNavigate={(newDate) => {
          setCalendarDate(newDate);
        }}
        onRangeChange={(range) => {
          const rangeObj = range as { start: Date; end: Date };
          const endDate = rangeObj.end;
          const lastDay2022 = new Date(2022, 11, 31);
          const firstDay2022 = new Date(2022, 0, 1);
          const duration = differenceInDays(lastDay2022, endDate);

          if (duration < -1) {
            setCalendarDate(firstDay2022);
          } else if (duration > 360) {
            setCalendarDate(lastDay2022);
          }
        }}
      />
    </div>
  );
}

function getEventClass(
  league: LEAGUE,
  event: CollegeEvent | ProEvent
): {
  className: string;
} {
  let className = "";

  if (league === LEAGUE.college) {
    const collegeEvent = event as CollegeEvent;

    if (collegeEvent.tournament) {
      className = "college-tournament";
    } else {
      switch (event.title) {
        case RECRUITING_STATES.Contact:
          className = "recruiting-contact";
          break;
        case RECRUITING_STATES.Dead:
          className = "recruiting-dead";
          break;
        case RECRUITING_STATES.EarlyLOI:
        case RECRUITING_STATES.LateLOI:
          className = "recruiting-loi";
          break;
        case RECRUITING_STATES.Evaluation:
          className = "recruiting-evaluation";
          break;
        case RECRUITING_STATES.None:
          className = "recruiting-none";
          break;
        case RECRUITING_STATES.Quiet:
          className = "recruiting-quiet";
          break;
        default:
          className = "college-important";
      }
    }
  } else {
    const proEvent = event as ProEvent;

    switch (proEvent.league) {
      case LEAGUE.development:
        className = "league-dev";
        break;
      case LEAGUE.european:
        className = "league-euro";
        break;
      default:
        className = "league-pro";
    }
  }

  return { className: className };
}
