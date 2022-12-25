import AutoComplete from "@components/FormControls/AutoComplete";
import Form from "@components/FormControls/Form";
import Input from "@components/FormControls/Input";
import Select from "@components/FormControls/Select";
import ModalSkeleton from "./ModalSkeleton";
import { LEAGUE, PRO_LEAGUE_INFO } from "@content/constants";
import { DevTool } from "@hookform/devtools";
import { formatTeamTitle } from "@lib/utils";
import { startCase } from "lodash-es";
import {
  LOW_HIGH_LEVELS,
  ProTeamForm,
  proTeamFormSchema,
  PRO_PERSONALITY,
} from "./schema";
import type { ProTeam } from "@lib/types";
import type { Path, SubmitHandler } from "react-hook-form";

type ProTeamModalProps = {
  isOpen: boolean;
  close: () => void;
  defaultValues?: ProTeamForm;
  options: ProTeam[];
};

export default function ProTeamModal({
  isOpen,
  close,
  options,
}: ProTeamModalProps) {
  const defaultValues: ProTeamForm = {
    team: null,
    password: "",
    firstName: "",
    lastName: "",
    age: 0,
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

  const abilityPoints = [
    {
      name: "offense",
      label: "Evaluating Offense",
    },
    {
      name: "defense",
      label: "Evaluating Defense",
    },
    {
      name: "potential",
      label: "Evaluating Potential",
    },
    {
      name: "gameStrategy",
      label: "Game Strategy",
    },
    { name: "playerDev", label: "Player Development" },
  ];

  const onSubmit: SubmitHandler<ProTeamForm> = (data) => {
    console.log(data);
    close();
  };

  return (
    <Form<ProTeamForm>
      onSubmit={onSubmit}
      validation={proTeamFormSchema}
      defaultValues={defaultValues}
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
            return curr + prev;
          }, 0);
          setValue("currentPointsTotal", currentAmount);
          return PRO_LEAGUE_INFO.pointLimits.total - currentAmount;
        };

        return (
          <ModalSkeleton
            type={LEAGUE.pro}
            member={PRO_LEAGUE_INFO.singleMember}
            htmlSection="siba"
            isOpen={isOpen}
            close={() => {
              reset(defaultValues);
              close();
            }}
          >
            <AutoComplete<ProTeamForm, ProTeam>
              id="proTeamSelect"
              name={"team"}
              label="Team Selection"
              size="half"
              options={options}
              renderOption={formatTeamTitle}
              renderOptionLabel={formatTeamTitle}
              isOptionEqualToValue={(option: ProTeam, value: ProTeam) =>
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
              {startCase(PRO_LEAGUE_INFO.singleMember)} Basics
            </p>
            <Input
              name="firstName"
              label="First Name"
              size={5}
              control={control}
            />
            <Input
              name="lastName"
              label="Last Name"
              size={5}
              control={control}
            />
            <Input
              name="age"
              type="number"
              size={2}
              min={25}
              max={90}
              help="Range: 25-75"
              control={control}
            />
            <Input
              name="picture"
              label="Face Picture Number"
              type={"number"}
              size={"one-quarter"}
              help={`Fill in the number of the matching picture from graphics/nonplayers/fac.`}
              control={control}
            />
            <Input
              name="outfit"
              label="Outfit Picture Number"
              type={"number"}
              size={"one-quarter"}
              help={`Fill in the number of the matching picture from graphics/nonplayers/clothes.`}
              control={control}
            />
            <Select
              name="personality"
              options={PRO_PERSONALITY}
              size="one-quarter"
              control={control}
            />
            <Select
              name="greed"
              label="Greed Level"
              options={LOW_HIGH_LEVELS}
              size="one-quarter"
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
            {abilityPoints.map(({ name, label }) => (
              <Input
                key={`${PRO_LEAGUE_INFO.singleMember}-${name}`}
                name={name as Path<ProTeamForm>}
                label={label}
                type={"number"}
                size="full"
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

            <DevTool control={control} />
          </ModalSkeleton>
        );
      }}
    </Form>
  );
}
