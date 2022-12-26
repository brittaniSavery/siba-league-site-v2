import AutoComplete from "@components/FormControls/AutoComplete";
import Form from "@components/FormControls/Form";
import Input from "@components/FormControls/Input";
import Select from "@components/FormControls/Select";
import ProbationIcon from "@components/ProbationIcon";
import { COLLEGE_LEAGUE_INFO, LEAGUE } from "@content/constants";
import type { School } from "@lib/types";
import { formatTeamTitle } from "@lib/utils";
import { capitalize, startCase } from "lodash-es";
import type { Path, SubmitHandler } from "react-hook-form";
import ModalSkeleton from "./ModalSkeleton";
import { CollegeTeamForm, LOW_HIGH_LEVELS } from "./schema";

type SchoolModalProps = {
  isOpen: boolean;
  close: () => void;
  defaultValues?: CollegeTeamForm;
  options: School[];
};
export default function SchoolModal({
  isOpen,
  close,
  options,
}: SchoolModalProps) {
  // const validation = schoolValidationSchema

  const defaultValues: CollegeTeamForm = {
    team: null,
    password: "",
    firstName: "",
    lastName: "",
    age: 0,
    picture: 0,
    outfit: 0,
    academics: "",
    ambition: "",
    discipline: "",
    integrity: "",
    temper: "",
    offense: 0,
    defense: 0,
    recruiting: 0,
    scouting: 0,
    playerDev: 0,
    currentPointsTotal: 0,
  };

  const abilityPoints = [
    {
      name: "offense",
      label: "Offensive Concepts",
    },
    {
      name: "defense",
      label: "Defensive Concepts",
    },
    {
      name: "scouting",
      label: "Scouting Ability",
    },
    {
      name: "recruiting",
      label: "Recruiting Ability",
    },
    { name: "playerDev", label: "Player Development" },
  ];

  const onSubmit: SubmitHandler<CollegeTeamForm> = (data) => {
    console.log(data);
  };

  return (
    <Form<CollegeTeamForm>
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      // validation={validation}
    >
      {({ control, formState: { errors }, watch, setValue }) => {
        const currentTeam = watch("team");
        const abilityPointsValues = watch([
          "offense",
          "defense",
          "scouting",
          "recruiting",
          "playerDev",
        ]);

        const calculatePointsLeft = () => {
          if (!currentTeam) return 0;

          const currentAmount = abilityPointsValues.reduce((prev, curr) => {
            curr = typeof curr !== "number" ? Number.parseInt(curr, 10) : curr;
            return curr + prev;
          }, 0);

          setValue("currentPointsTotal", currentAmount);
          return (
            COLLEGE_LEAGUE_INFO.pointLimits[currentTeam.tier].total -
            currentAmount
          );
        };

        return (
          <ModalSkeleton
            type={LEAGUE.college}
            member={COLLEGE_LEAGUE_INFO.singleMember}
            htmlSection="college"
            isOpen={isOpen}
            close={close}
            extraInfo={
              <p>
                Teams that have an exclamation icon (
                <ProbationIcon iconOnly />) are on probation.
              </p>
            }
          >
            <AutoComplete<CollegeTeamForm, School>
              id="schoolSelect"
              name={"team"}
              label="Team Selection"
              size="half"
              options={options}
              renderOption={(school: School) => {
                const schoolTitle = formatTeamTitle(school);
                return (
                  <>
                    <p>
                      {school.probation ? (
                        <ProbationIcon
                          school={schoolTitle}
                          details={school.probation}
                        />
                      ) : (
                        schoolTitle
                      )}
                    </p>
                    <p className="help">
                      Tier {school.tier} | Region: {school.region}
                    </p>
                  </>
                );
              }}
              renderOptionLabel={formatTeamTitle}
              isOptionEqualToValue={(option: School, value: School) =>
                option.name === value.name
              }
              control={control}
            />
            <Input
              name="password"
              label="Team Password"
              size="half"
              control={control}
            />

            <p className="column is-full is-size-5">
              {startCase(COLLEGE_LEAGUE_INFO.singleMember)} Basics
            </p>
            <Input
              name="firstName"
              label="First Name"
              size="half"
              control={control}
            />
            <Input
              name="lastName"
              label="Last Name"
              size="half"
              control={control}
            />
            <Input
              name="age"
              type="number"
              size="one-third"
              min={25}
              max={75}
              help="Range: 25-75"
              control={control}
            />
            <Input
              name="picture"
              label="Face Picture Number"
              type="number"
              size="one-third"
              help="Fill in the number of the matching picture from graphics/coaches/fac."
              control={control}
            />
            <Input
              name="outfit"
              label="Outfit Picture Number"
              type="number"
              size="one-third"
              help="Fill in the number of the matching picture from graphics/coaches/clothes."
              control={control}
            />
            <div className="column is-full">
              <div className="content">
                <p className="is-size-5">Head Coach Personality</p>
                <p>
                  These are the different aspects of the coach&apos;s
                  personality. For Ambition, Integrity, and Temper, the level
                  indicates the amount a coach has for the corresponding
                  category. For Academics and Discipline, the level determines
                  how important the category is to the coach. For example, a
                  coach with high integrity and low academics will not bribe
                  players but also doesn&apos;t care if students have good
                  grades.
                </p>
              </div>
            </div>
            {["ambition", "academics", "discipline", "integrity", "temper"].map(
              (cat) => (
                <Select
                  key={`college-${cat}`}
                  name={cat as Path<CollegeTeamForm>}
                  label={capitalize(cat)}
                  options={Object.values(LOW_HIGH_LEVELS)}
                  size="one-fifth"
                  control={control}
                />
              )
            )}

            <p className="column is-full is-size-5">
              {startCase(COLLEGE_LEAGUE_INFO.singleMember)} Ability Points
            </p>

            <AbilityPointsInfo currentTeam={currentTeam} />

            {abilityPoints.map(({ name, label }) => (
              <Input
                key={`${COLLEGE_LEAGUE_INFO.singleMember}-${name}`}
                name={name as Path<CollegeTeamForm>}
                label={label}
                type={"number"}
                size="full"
                style={{ width: "6rem" }}
                min={10}
                max={85}
                horizontal
                control={control}
                disabled={!currentTeam}
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
                      value={calculatePointsLeft()}
                      readOnly
                    />
                  </p>
                  {errors.currentPointsTotal && (
                    <p className="help has-text-danger-dark">
                      {errors.currentPointsTotal.message as string}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </ModalSkeleton>
        );
      }}
    </Form>
  );
}

type AbilityPointsInfoProps = {
  currentTeam: School | null;
};

function AbilityPointsInfo({ currentTeam }: AbilityPointsInfoProps) {
  let pointsDetails: string;

  if (currentTeam) {
    const tier = currentTeam.tier;
    const pointLimits = COLLEGE_LEAGUE_INFO.pointLimits[tier];

    pointsDetails = `For a Tier ${tier} school, the minimum that each category can have is ${pointLimits.min} and the maximum is ${pointLimits.max}. The maximum sum of the categories is ${pointLimits.total}.`;
  } else {
    pointsDetails = "Please select a team to view point limitations.";
  }

  return (
    <p className="column is-full">
      These are the skills that your {COLLEGE_LEAGUE_INFO.singleMember} will
      have in evaluating players. {pointsDetails}
    </p>
  );
}
