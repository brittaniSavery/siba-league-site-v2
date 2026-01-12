import clsx from "clsx";
import { useState } from "react";
import JoinModal from "./JoinModal";

export default function SelectedTeams() {
  const [activeTab, setActiveTab] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
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
              <p>You are able to manage only one (1) pro team.</p>
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="button  mt-2"
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
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="button mt-2"
              >
                Add college team
              </button>
            </>
          )}
        </div>
      </div>
      <JoinModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Select Your Teams"
        mode="add"
      >
        <p>Modal content goes here.</p>
      </JoinModal>
    </>
  );
}
