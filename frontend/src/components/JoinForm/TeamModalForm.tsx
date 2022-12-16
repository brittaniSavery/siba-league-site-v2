import Input from "@components/FormControls/Input";
import Select from "@components/FormControls/Select";
import { LEAGUE } from "@content/constants";
import type { ProTeam, School } from "@lib/types";
import { startCase } from "lodash-es";
import { LOW_HIGH_LEVELS, PRO_PERSONALITY } from "./schema";
import SchoolSelect from "./SchoolSelect";
import ProTeamSelect from "./ProTeamSelect";
import { useFormContext } from "react-hook-form";

export default function TeamModalForm({
  singleMember,
  league,
  options,
}: {
  singleMember: string;
  league: LEAGUE;
  options: School[] | ProTeam[];
}) {
  const { register } = useFormContext();

  const isPro = league === LEAGUE.pro;
  const isCollege = league === LEAGUE.college;
  const lowHighOptions = Object.keys(LOW_HIGH_LEVELS);
  const abilityPoints = [
    {
      name: "offense",
      label: isCollege ? "Offensive Concepts" : "Evaluating Offense",
    },
    {
      name: "defense",
      label: isCollege ? "Defensive Concepts" : "Evaluating Defense",
    },
    {
      name: isCollege ? "scouting" : "potential",
      label: isCollege ? "Scouting Ability" : "Evaluating Potential",
    },
    {
      name: isCollege ? "recruiting" : "gameStrategy",
      label: isCollege ? "Recruiting Ability" : "Game Strategy",
    },
    { name: "playerDev", label: "Player Development" },
  ];

  return (
    <div className="columns is-multiline">
      <p className="column is-full is-size-5">Team Basics</p>

      <input type={"hidden"} {...register("league")} value={league} />

      {isPro && <ProTeamSelect teams={options as ProTeam[]} />}
      {isCollege && <SchoolSelect schools={options as School[]} />}

      <Input name="teamPassword" label="Team Password" size="half" />

      <p className="column is-full is-size-5">
        {startCase(singleMember)} Basics
      </p>
      <Input
        name="memberFirstName"
        label="First Name"
        size={isPro ? 5 : "half"}
      />
      <Input
        name="memberLastName"
        label="Last Name"
        size={isPro ? 5 : "half"}
      />
      <Input
        name="memberAge"
        label="Age"
        type="number"
        size={isPro ? 2 : "one-third"}
        min={25}
        max={90}
        help="Range: 25-90"
      />
      <Input
        name="memberPicture"
        label="Face Picture Number"
        type={"number"}
        size={isPro ? "one-quarter" : "one-third"}
        help={`Fill in the number of the matching picture from graphics/${
          isPro ? "nonplayers" : "coaches"
        }/fac.`}
      />
      <Input
        name="memberOutfit"
        label="Outfit Picture Number"
        type={"number"}
        size={isPro ? "one-quarter" : "one-third"}
        help={`Fill in the number of the matching picture from graphics/${
          isPro ? "nonplayers" : "coaches"
        }/clothes.`}
      />

      {isPro && (
        <>
          <Select
            name="memberPersonality"
            label="Personality"
            options={Object.keys(PRO_PERSONALITY)}
            size="one-quarter"
          />
          <Select
            name="memberGreed"
            label="Greed Level"
            options={lowHighOptions}
            size="one-quarter"
          />
        </>
      )}

      {isCollege && <HeadCoachPersonality />}
      <p className="column is-full is-size-5">
        {startCase(singleMember)} Ability Points
      </p>

      <p className="column is-full">
        These are the skills that your {singleMember} will have in evaluating
        players. The minimum that each category can have is 10 and the maximum
        is 85. The maximum sum of the categories is 325.
      </p>

      {isPro && (
        <p className="column is-full">
          <b>Note:</b> All staff members play some role in the evaluation of
          player ratings. However, the head coach has the biggest influence in
          determining a player&apos;s rating, followed by the General Manager
          and then the assistant coaches in order of job seniority. In terms of
          player development, the General Manager plays <em>NO</em> role.
        </p>
      )}

      {abilityPoints.map(({ name, label }) => (
        <Input
          key={`${singleMember}-${name}`}
          name={name}
          label={label}
          type={"number"}
          size="full"
          style={{ width: "6rem" }}
          min={10}
          max={85}
          horizontal
        />
      ))}

      <div className="column is-full field is-horizontal">
        <div className="field-label is-normal">
          <label className="label">Points Remaining</label>
        </div>
        <div className="field-body">
          <div className="field">
            <p className="control">
              <input
                className="input is-static"
                type="number"
                value="325"
                readOnly
              />
            </p>
          </div>
        </div>
      </div>
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
