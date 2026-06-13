import type { NewCollegeTeam, NewProTeam } from "@lib/types";
import clsx from "clsx";
import { useState } from "react";

type SelectedTeamsProps = {
  pro?: NewProTeam;
  college?: NewCollegeTeam[];
  onAdd: (type: "pro" | "college") => void;
  onEdit: () => void;
  onDelete: () => void;
};

export default function SelectedTeams({
  pro,
  college,
  onAdd,
  onEdit,
  onDelete,
}: SelectedTeamsProps) {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <>
      <div className="field teams">
        <div className="teams-header pt-2">
          <div className="tabs">
            <ul>
              <li className={clsx(activeTab === 1 && "is-active")}>
                <a onClick={() => setActiveTab(1)}>Pro</a>
              </li>
              <li className={clsx(activeTab === 2 && "is-active")}>
                <a onClick={() => setActiveTab(2)}>College</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="teams-content">
          {activeTab === 1 && (
            <>
              <p>
                You are able to manage only one (1) pro team and its
                corresponding D-League team. Note: it is not necessary to manage
                a D-League team. However, if you would like more control over
                playing time for your developing, managing your D-League team is
                highly recommended.
              </p>
              {/* Selected pro team would go here */}
              <button
                type="button"
                onClick={() => onAdd("pro")}
                className="button mt-2"
              >
                Add pro team
              </button>
            </>
          )}
          {activeTab === 2 && (
            <>
              <p>
                You are allowed to coach up to five (5) teams: a single Tier 1,
                two Tier 2, and two Tier 3. They each must be different
                recruiting regions <strong>and</strong> different conferences.
              </p>
              {/* List of selected college teams would go here */}
              <button
                type="button"
                onClick={() => onAdd("college")}
                className="button mt-2"
              >
                Add college team
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
