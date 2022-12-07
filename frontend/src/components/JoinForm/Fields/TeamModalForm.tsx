import { LEAGUE } from "@content/constants";
import { startCase } from "lodash-es";

export default function TeamModalForm({
  singleMember,
  league,
}: {
  singleMember: string;
  league: LEAGUE;
}) {
  return (
    <div className="columns is-multiline">
      <p className="column is-full is-size-5">Team Basics</p>
      <p className="column is-full is-size-5">
        {startCase(singleMember)} Basics
      </p>
      {league === LEAGUE.college && <HeadCoachPersonality />}
      <p className="column is-full is-size-5">
        {startCase(singleMember)} Ability Points
      </p>
    </div>
  );
}

function HeadCoachPersonality() {
  return (
    <div className="column is-full">
      <div className="content">
        <p className="is-size-5">Head Coach Personality</p>
        <p>
          These are the different aspects of the coach&apos;s personality. For
          Ambition, Integrity, and Temper, the level indicates the amount a
          coach has for the corresponding category. For Academics and
          Discipline, the level determines how important the category is to the
          coach. For example, a coach with high integrity and low academics will
          not bribe players but also doesn&apos;t care if students have good
          grades.
        </p>
      </div>
    </div>
  );
}
