import Form from "@components/FormControls/Form";
import ProbationIcon from "@components/ProbationIcon";
import {
  COLLEGE_LEAGUE_INFO,
  LEAGUE,
  PRO_LEAGUE_INFO,
} from "@content/constants";
import type { ProTeam, School } from "@lib/types";
import clsx from "clsx";
import { capitalize } from "lodash-es";
import type { SubmitHandler } from "react-hook-form";
import type { FormCollegeTeam, FormProTeam } from "./schema";
import TeamModalForm from "./TeamModalForm";

type TeamModalProps = {
  isOpen: boolean;
  close: () => void;
  league: LEAGUE;
  importedTeam?: FormProTeam | FormCollegeTeam;
  options: School[] | ProTeam[];
};
export default function TeamModal({
  isOpen,
  close,
  league,
  options,
}: TeamModalProps) {
  const leagueInfo =
    league === LEAGUE.pro ? PRO_LEAGUE_INFO : COLLEGE_LEAGUE_INFO;

  const onSubmit: SubmitHandler<FormProTeam | FormCollegeTeam> = (data) => {
    console.log(data);
  };

  return (
    <Form<FormProTeam | FormCollegeTeam> onSubmit={onSubmit}>
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
                  Teams that have an exclamation icon (
                  <ProbationIcon iconOnly />) are on probation.
                </p>
              )}
            </div>
            <TeamModalForm
              league={league}
              singleMember={leagueInfo.singleMember}
              options={options}
            />
          </section>
          <footer className="modal-card-foot">
            <button type="submit" className="button is-primary">
              Add
            </button>
            <button className="button" onClick={close}>
              Cancel
            </button>
          </footer>
        </div>
      </div>
    </Form>
  );
}
