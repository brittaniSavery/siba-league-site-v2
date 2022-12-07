import ProbationIcon from "@components/ProbationIcon";
import {
  COLLEGE_LEAGUE_INFO,
  LEAGUE,
  PRO_LEAGUE_INFO,
} from "@content/constants";
import clsx from "clsx";
import { capitalize, startCase } from "lodash-es";
import TeamModalForm from "./Fields/TeamModalForm";

type TeamModalProps = {
  isOpen: boolean;
  close: () => void;
  league: LEAGUE;
  //TODO: Add team object if editing
};
export default function TeamModal({ isOpen, close, league }: TeamModalProps) {
  const leagueInfo =
    league === LEAGUE.pro ? PRO_LEAGUE_INFO : COLLEGE_LEAGUE_INFO;

  return (
    <div className={clsx("modal", isOpen && "is-active")}>
      <div className="modal-background" onClick={close} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            Add {capitalize(leagueInfo.typeFull)} Team
          </p>
          <button className="delete" aria-label="close" />
        </header>
        <section className="modal-card-body">
          <div className="content">
            <p>
              This form includes all the details needed for your team and{" "}
              {leagueInfo.singleMember}. When selecting your{" "}
              {leagueInfo.singleMember}&apos;s face and outfit, be sure to use
              the graphics found in{" "}
              <a
                href={`/${
                  league === LEAGUE.pro ? "siba" : "college"
                }/downloads`}
                target="_blank"
                rel="noreferrer"
              >
                Downloads
              </a>
              .
            </p>
            {league === LEAGUE.college && (
              <p>
                Teams that have an exclamation icon (<ProbationIcon iconOnly />)
                are on probation.
              </p>
            )}
          </div>
          <TeamModalForm
            league={league}
            singleMember={leagueInfo.singleMember}
          />
        </section>
        <footer className="modal-card-foot">
          <button className="button is-primary">Add</button>
          <button className="button" onClick={close}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
}
