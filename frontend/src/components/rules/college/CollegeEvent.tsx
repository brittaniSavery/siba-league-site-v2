import type { EventInput } from "@fullcalendar/core/index.js";
import clsx from "clsx";

type CollegeEventProps = {
  event: EventInput;
};

export default function CollegeEvent({
  event: { title, classNames },
}: CollegeEventProps) {
  return (
    <div className={clsx("college-event", classNames)} title={title}>
      <span className="college-event-title">{title}</span>
    </div>
  );
}
