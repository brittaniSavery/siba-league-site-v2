import AutoComplete from "@components/FormControls/AutoComplete";
import Form from "@components/FormControls/Form";
import Input from "@components/FormControls/Input";
import Radio from "@components/FormControls/Radio";
import Select from "@components/FormControls/Select";
import { LEAGUE, PRO_LEAGUE_INFO } from "@content/constants";
import {
  LOW_HIGH_LEVELS,
  ProTeamForm,
  proTeamFormSchema,
  PRO_PERSONALITY,
} from "@lib/joinForm";
import type { ProTeam } from "@lib/types";
import { formatTeamTitle } from "@lib/utils";
import { startCase } from "lodash-es";
import type { Path, SubmitHandler } from "react-hook-form";
import ModalSkeleton from "./ModalSkeleton";

type ProTeamModalProps = {
  id?: string;
  isOpen: boolean;
  mode?: "add" | "edit";
  options: ProTeam[];
  selectedForm?: ProTeamForm;
  close: () => void;
  sendToMainForm: (data: ProTeamForm) => void;
};

export default function ProTeamModal({
  id,
  isOpen,
  mode,
  options,
  selectedForm,
  close,
  sendToMainForm,
}: ProTeamModalProps) {
  const blankForm: ProTeamForm = {
    team: null,
    password: "",
    firstName: "",
    lastName: "",
    age: 0,
    gender: "male",
    picture: 0,
    outfit: 0,
    greed: "",
    personality: "",
    offense: 0,
    defense: 0,
    potential: 0,
    gameStrategy: 0,
    playerDev: 0,
    currentPointsTotal: 0,
  };

  const onSubmit: SubmitHandler<ProTeamForm> = (data) => {
    sendToMainForm(data);
    close();
  };

  return (
    <Form<ProTeamForm>
      onSubmit={onSubmit}
      validation={proTeamFormSchema}
      defaultValues={selectedForm || blankForm}
    >
      {({ control, formState: { errors }, reset, watch, setValue }) => {
        const abilityPointsValues = watch([
          "offense",
          "defense",
          "potential",
          "gameStrategy",
          "playerDev",
        ]);

        const calculatePointsLeft = () => {
          const currentAmount = abilityPointsValues.reduce((prev, curr) => {
            curr = typeof curr !== "number" ? Number.parseInt(curr, 10) : curr;
            return curr + prev;
          }, 0);
          setValue("currentPointsTotal", currentAmount);
          return PRO_LEAGUE_INFO.pointLimits.total - currentAmount;
        };

        return (
          <ModalSkeleton
            id={id}
            type={LEAGUE.pro}
            member={PRO_LEAGUE_INFO.singleMember}
            htmlSection="siba"
            isOpen={isOpen}
            mode={mode}
            close={() => {
              reset(blankForm);
              close();
            }}
          >
            <AutoComplete<ProTeamForm, ProTeam>
              id="proTeamSelect"
              name={"team"}
              label="Team Selection"
              colSize="half"
              options={options}
              renderOption={formatTeamTitle}
              renderOptionLabel={formatTeamTitle}
              isOptionEqualToValue={(option: ProTeam, value: ProTeam) =>
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
              {startCase(PRO_LEAGUE_INFO.singleMember)} Basics
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
              max={90}
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
              type={"number"}
              min={1}
              max={3022}
              colSize={"one-quarter"}
              help={`Fill in the number of the matching picture from graphics/${PRO_LEAGUE_INFO.pictureFolder}/fac.`}
              control={control}
            />
            <Input
              name="outfit"
              label="Outfit Picture Number"
              type={"number"}
              min={1}
              max={1017}
              colSize={"one-quarter"}
              help={`Fill in the number of the matching picture from graphics/${PRO_LEAGUE_INFO.pictureFolder}/clothes.`}
              control={control}
            />
            <Select
              name="personality"
              options={PRO_PERSONALITY}
              colSize="one-quarter"
              control={control}
            />
            <Select
              name="greed"
              label="Greed Level"
              options={LOW_HIGH_LEVELS}
              colSize="one-quarter"
              control={control}
            />

            <p className="column is-full is-size-5">
              {startCase(PRO_LEAGUE_INFO.singleMember)} Ability Points
            </p>

            <p className="column is-full">
              These are the skills that your {PRO_LEAGUE_INFO.singleMember} will
              have in evaluating players. The minimum that each category can
              have is {PRO_LEAGUE_INFO.pointLimits.min} and the maximum is{" "}
              {PRO_LEAGUE_INFO.pointLimits.max}. The maximum sum of the
              categories is {PRO_LEAGUE_INFO.pointLimits.total}.
            </p>

            <p className="column is-full">
              <b>Note:</b> All staff members play some role in the evaluation of
              player ratings. However, the head coach has the biggest influence
              in determining a player&apos;s rating, followed by the General
              Manager and then the assistant coaches in order of job seniority.
              In terms of player development, the General Manager plays{" "}
              <em>NO</em> role.
            </p>

            {PRO_LEAGUE_INFO.pointLabels.map(({ key, label: { pro } }) => (
              <Input
                key={`${PRO_LEAGUE_INFO.singleMember}-${key}`}
                name={key as Path<ProTeamForm>}
                label={pro}
                type={"number"}
                colSize="full"
                style={{ width: "6rem" }}
                min={10}
                max={85}
                horizontal
                control={control}
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
