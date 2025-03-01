import ProbationIcon from "@components/ProbationIcon";
import {
  COLLEGE_LEAGUE_INFO,
  Defense,
  GameStrategy,
  LEAGUE,
  Offense,
  PlayerDev,
  Potential,
  PRO_LEAGUE_INFO,
  Recruiting,
  Scouting,
} from "@lib/constants";
import type { CollegeTeamForm, ProTeamForm } from "@lib/joinForm";
import type { FieldError } from "react-hook-form";
import { startCase } from "lodash-es";
import { useState } from "react";

type TeamCardProps = React.PropsWithChildren & {
  league: LEAGUE.pro | LEAGUE.college;
  form: ProTeamForm | CollegeTeamForm;
  error?: FieldError;
  onEdit: () => void;
  onDelete: () => void;
};

export default function TeamCard({
  league,
  form,
  error,
  onEdit,
  onDelete,
}: TeamCardProps) {
  const [showPassword, setShowPassword] = useState(false);
  const leagueInfo =
    league === LEAGUE.pro ? PRO_LEAGUE_INFO : COLLEGE_LEAGUE_INFO;

  const { team, firstName, lastName, password, picture, outfit, age } = form;

  if (!team) return null;

  const proTeamForm = form as ProTeamForm;
  const collegeTeamForm = form as CollegeTeamForm;

  const UniqueAbilityPoints = () => {
    if (league === LEAGUE.pro) {
      return (
        <>
          <li>
            {Potential.label.pro}: {proTeamForm.potential}
          </li>
          <li>
            {GameStrategy.label.pro}: {proTeamForm.gameStrategy}
          </li>
        </>
      );
    }

    return (
      <>
        <li>
          {Scouting.label.college}: {collegeTeamForm.scouting}
        </li>
        <li>
          {Recruiting.label.college}: {collegeTeamForm.recruiting}
        </li>
      </>
    );
  };

  return (
    <div className="card is-shadowless">
      <div className="card-content">
        {error && (
          <div className="notification is-danger is-light">
            <strong>Error!</strong> Schools cannot share tiers or regions.
          </div>
        )}
        <p className="title is-4">
          {team.name} {team.mascot}
          {league === LEAGUE.college && collegeTeamForm.team?.probation && (
            <span>
              &nbsp;
              <ProbationIcon details={collegeTeamForm.team.probation} />
            </span>
          )}
        </p>
        {league === LEAGUE.college && collegeTeamForm.team && (
          <p className="subtitle is-6">
            Tier {collegeTeamForm.team.tier} | Region:{" "}
            {collegeTeamForm.team.region}
          </p>
        )}
        <p>
          <button
            type="button"
            className="button is-small"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"} Password
          </button>
          {showPassword && <code className="ml-2">{password}</code>}
        </p>
        <div className="mb-4">
          <div
            style={{ position: "relative", width: "260px", height: "190px" }}
          >
            <img
              style={{ position: "absolute" }}
              src={`${import.meta.env.SITE}files/${league}/Website/images/${
                leagueInfo.pictureFolder
              }/fac/${picture}.png`}
            />
            <img
              style={{ position: "absolute", zIndex: 1 }}
              src={`${import.meta.env.SITE}files/${league}/Website/images/${
                leagueInfo.pictureFolder
              }/clothes/${outfit}.png`}
            />
          </div>
          <p>{startCase(leagueInfo.singleMember)}</p>
          <p>
            {firstName} {lastName} ({age})
          </p>
        </div>
        {league === LEAGUE.college && (
          <>
            <p className="title is-5 mb-0">Personality</p>
            <ul className="mb-4" style={{ listStyle: "none" }}>
              <li>Ambition: {collegeTeamForm.ambition}</li>
              <li>Academics: {collegeTeamForm.academics}</li>
              <li>Discipline: {collegeTeamForm.discipline}</li>
              <li>Integrity: {collegeTeamForm.integrity}</li>
              <li>Temper: {collegeTeamForm.temper}</li>
            </ul>
          </>
        )}
        <p className="title is-5 mb-0">Ability Points</p>
        <ul style={{ listStyle: "none" }}>
          <li>
            {Offense.label[league]}: {form.offense}
          </li>
          <li>
            {Defense.label[league]}: {form.defense}
          </li>
          <UniqueAbilityPoints />
          <li>
            {PlayerDev.label[league]}: {form.playerDev}
          </li>
        </ul>
      </div>
      <footer className="card-footer">
        <button
          type="button"
          className="button is-outlined is-primary is-radiusless card-footer-item"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          type="button"
          className="button is-outlined is-danger is-radiusless	card-footer-item"
          onClick={onDelete}
        >
          Delete
        </button>
      </footer>
    </div>
  );
}
