import AutoComplete from "@components/FormControls/AutoComplete";
import Form from "@components/FormControls/Form";
import Input from "@components/FormControls/Input";
import Radio from "@components/FormControls/Radio";
import Select from "@components/FormControls/Select";
import ProbationIcon from "@components/ProbationIcon";
import { COLLEGE_LEAGUE_INFO, LEAGUE } from "@lib/constants";
import {
  CollegeTeamForm,
  collegeTeamFormSchema,
  LOW_HIGH_LEVELS,
} from "@lib/joinForm";
import type { School } from "@lib/types";
import { formatTeamTitle } from "@lib/utils";
import { capitalize, startCase } from "lodash-es";
import type { Path, SubmitHandler } from "react-hook-form";
import ModalSkeleton from "./ModalSkeleton";

type SchoolModalProps = {
  id?: string;
  isOpen: boolean;
  mode?: "add" | "edit";
  close: () => void;
  selectedForm?: CollegeTeamForm;
  options: School[];
  sendToMainForm: (data: CollegeTeamForm) => void;
};
export default function SchoolModal({
  id,
  isOpen,
  mode,
  close,
  options,
  selectedForm,
  sendToMainForm,
}: SchoolModalProps) {
  const blankForm: CollegeTeamForm = {
    team: null,
    password: "",
    firstName: "",
    lastName: "",
    age: 0,
    gender: "male",
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

  const onSubmit: SubmitHandler<CollegeTeamForm> = (data) => {
    sendToMainForm(data);
    close();
  };

  return (
    <Form<CollegeTeamForm>
      onSubmit={onSubmit}
      defaultValues={selectedForm || blankForm}
      validation={collegeTeamFormSchema}
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
            id={id}
            type={LEAGUE.college}
            member={COLLEGE_LEAGUE_INFO.singleMember}
            htmlSection="college"
            isOpen={isOpen}
            mode={mode}
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
              colSize="half"
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
              renderHelp={({ tier, region, probation }) => (
                <>
                  <span>
                    Tier {tier} | Region: {region}
                  </span>
                  {probation && (
                    <>
                      <br />
                      <span className="icon-text">
                        <ProbationIcon iconOnly />
                        <span>Probation: {probation}</span>
                      </span>
                    </>
                  )}
                </>
              )}
              isOptionEqualToValue={(option: School, value: School) =>
                option.name === value.name
              }
              control={control}
            />
            <Input
              type="password"
              name="password"
              label="Team Password"
              colSize="half"
              control={control}
            />

            <p className="column is-full is-size-5">
              {startCase(COLLEGE_LEAGUE_INFO.singleMember)} Basics
            </p>
            <Input
              name="firstName"
              label="First Name"
              colSize={"4"}
              control={control}
            />
            <Input
              name="lastName"
              label="Last Name"
              colSize={"4"}
              control={control}
            />
            <Input
              name="age"
              type="number"
              colSize={"2"}
              min={25}
              max={75}
              help="Range: 25-75"
              control={control}
            />
            <Radio
              name="gender"
              colSize={"2"}
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
              ]}
              control={control}
            />
            <Input
              name="picture"
              label="Face Picture Number"
              type="number"
              min={1}
              max={1022}
              colSize={"4"}
              help={`Fill in the number of the matching picture from graphics/${COLLEGE_LEAGUE_INFO.pictureFolder}/fac.`}
              control={control}
            />
            <Input
              name="outfit"
              label="Outfit Picture Number"
              type="number"
              min={1}
              max={1006}
              colSize={"4"}
              help={`Fill in the number of the matching picture from graphics/${COLLEGE_LEAGUE_INFO.pictureFolder}/clothes.`}
              control={control}
            />
            <div className="column is-4" />
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
                  colSize="one-fifth"
                  control={control}
                />
              )
            )}

            <p className="column is-full is-size-5">
              {startCase(COLLEGE_LEAGUE_INFO.singleMember)} Ability Points
            </p>

            <AbilityPointsInfo currentTeam={currentTeam} />

            {COLLEGE_LEAGUE_INFO.pointLabels.map(
              ({ key, label: { college } }) => (
                <Input
                  key={`${COLLEGE_LEAGUE_INFO.singleMember}-${key}`}
                  name={key as Path<CollegeTeamForm>}
                  label={college}
                  type={"number"}
                  colSize="full"
                  style={{ width: "6rem" }}
                  min={10}
                  max={85}
                  horizontal
                  control={control}
                  disabled={!currentTeam}
                />
              )
            )}
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
