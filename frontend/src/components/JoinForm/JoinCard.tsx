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
} from "@content/constants";
import { startCase } from "lodash-es";
import { useState } from "react";
import type { ProTeamForm, CollegeTeamForm } from "@lib/joinForm";
import clsx from "clsx";
import type { Path } from "react-hook-form";

type TeamCardProps = React.PropsWithChildren & {
  league: LEAGUE.pro | LEAGUE.college;
  form: ProTeamForm | CollegeTeamForm;
  onEdit: () => void;
  onDelete: () => void;
};

export default function TeamCard({
  league,
  form,
  onEdit,
  onDelete,
}: TeamCardProps) {
  const [showPassword, setShowPassword] = useState(false);
  const leagueInfo =
    league === LEAGUE.pro ? PRO_LEAGUE_INFO : COLLEGE_LEAGUE_INFO;

  const { team, firstName, lastName, password, picture, outfit } = form;

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
        <p className="title is-4">
          {team.name} {team.mascot}
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
          <img
            src={`${import.meta.env.SITE}/files/${league}/Website/images/${
              leagueInfo.pictureFolder
            }/fac/${picture}.png`}
          />
          <img
            style={{ position: "absolute", right: "24px", zIndex: 1 }}
            src={`${import.meta.env.SITE}/files/${league}/Website/images/${
              leagueInfo.pictureFolder
            }/clothes/${outfit}.png`}
          />
          <p>{startCase(leagueInfo.singleMember)}</p>
          <p>
            {firstName} {lastName}
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
