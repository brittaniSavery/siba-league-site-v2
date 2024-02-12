import { useState } from "react";
import type { MainForm } from "./lib";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";

export default function TeamPicks() {
  const [tabView, setTabView] = useState<"pro" | "college">("pro");
  const methods = useFormContext<MainForm>();

  return (
    <div className="pb-4">
      <div className="content mt-5">
        <h2>Pick Your Teams</h2>
        <p>
          This is where your team choices will appear after adding them by
          clicking the &quot;Add&quot; button for pro or college teams. Feel
          free to only add a pro league or just some college teams. At least one
          team is required before submitting the form.
        </p>
      </div>

      <div className="card is-shadowless">
        <div className="has-background-light pt-2 px-2 mb-0 tabs is-boxed">
          <ul>
            <li className={clsx(tabView === "pro" && "is-active")}>
              <a onClick={() => setTabView("pro")}>Pro</a>
            </li>
            <li className={clsx(tabView === "college" && "is-active")}>
              <a onClick={() => setTabView("college")}>College</a>
            </li>
          </ul>
        </div>
        <div className="card-content">
          <div className={clsx(tabView !== "pro" && "is-hidden")}>
            <p>You are able to manage only one (1) pro team.</p>
          </div>
          <div className={clsx(tabView !== "college" && "is-hidden")}>
            <p>
              You are allowed to coach up to three (3) teams. They each must be
              in different tiers and different recruiting regions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
