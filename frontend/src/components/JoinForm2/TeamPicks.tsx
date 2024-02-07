import { useState } from "react";
import type { CollegeForm, ProForm } from "./lib";
import clsx from "clsx";

export default function TeamPicks() {
  const [tabView, setTabView] = useState<"pro" | "college">("pro");

  return (
    <>
      <div className="content mt-5">
        <h2>Pick Your Teams</h2>
        <p>
          This is where your team choices will appear after adding them by
          clicking the &quot;Add&quot; button for pro or college teams. Feel
          free to only add a pro league or just some college teams. At least one
          team is required before submitting the form.
        </p>
      </div>

      <div className="card is-shadowless"></div>
      <div className="tabs is-boxed">
        <ul>
          <li className={clsx(tabView === "pro" && "is-active")}>
            <a onClick={() => setTabView("pro")}>Pro</a>
          </li>
          <li className={clsx(tabView === "college" && "is-active")}>
            <button onClick={() => setTabView("college")}>College</button>
          </li>
        </ul>
      </div>
      <div className="card-header"></div>

      <div className="card-content"></div>
    </>
  );
}
