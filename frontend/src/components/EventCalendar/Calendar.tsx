import { LEAGUE } from "@lib/constants";
import { collegeEvents, proEvents } from "./events";
import type {
  SibaEvent,
  StrapiSimDates,
  StrapiSingleTypeResponse,
} from "@lib/types";
import { getDataFromApi } from "@lib/utils";
import "@styles/calendar.scss";
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
  Views,
  type DateFormat,
  type Formats,
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
  const events = league === LEAGUE.college ? collegeEvents : proEvents;

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

  const formats: Formats = useMemo(
    () => ({
      monthHeaderFormat: (date, _culture, localizer) => {
        if (!localizer) {
          return "";
        }

        const format: DateFormat = localizer?.format(date, "LLLL");
        return format;
      },
    }),
    []
  );

  return (
    <div className="pb-4" style={{ height: "80vh" }}>
      <Calendar<SibaEvent>
        popup
        localizer={localizer}
        date={calendarDate}
        events={events}
        formats={formats}
        defaultView={Views.MONTH}
        views={[Views.MONTH]}
        length={7}
        eventPropGetter={(event) => ({ className: `event-${event.type}` })}
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
