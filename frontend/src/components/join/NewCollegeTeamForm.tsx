import {
  COLLEGE_LEAGUE_INFO,
  LOW_TO_HIGH,
  PRO_LEAGUE_INFO,
  PRO_PERSONALITY,
} from "@lib/constants";
import type { NewCollegeTeam, School } from "@lib/types";
import { useForm, type Path, type SubmitHandler } from "react-hook-form";
import JoinField from "./JoinField";
import JoinInput from "./JoinInput";
import JoinModal from "./JoinModal";
import JoinSelect from "./JoinSelect";
import { useState } from "react";
import JoinCombobox from "./JoinComboBox";

type NewCollegeTeamFormProps = {
  isOpen: boolean;
  mode: "add" | "edit";
  availableTeams: School[];
  selectedTeam?: NewCollegeTeam;
  onClose: () => void;
  onSubmit: (team: NewCollegeTeam) => void;
};

export default function NewCollegeTeamForm({
  isOpen,
  mode,
  availableTeams,
  selectedTeam,
  onClose,
  onSubmit,
}: NewCollegeTeamFormProps) {
  const defaultFormValues: NewCollegeTeam = selectedTeam || {
    firstName: "",
    lastName: "",
    password: "",
    face: 1,
    outfit: 1,
    age: 25,
    defense: 0,
    offense: 0,
    playerDev: 0,
    scouting: 0,
    recruiting: 0,
    temper: "",
    integrity: "",
    academics: "",
    ambition: "",
    discipline: "",
    team: null,
    abilityPointsTotal: 0,
  };
  const tierValues = COLLEGE_LEAGUE_INFO.pointLimits;

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<NewCollegeTeam>({
    defaultValues: selectedTeam || defaultFormValues,
  });
  const currentTier = watch("team.tier");
  const abilityPointsValues = watch([
    "offense",
    "defense",
    "playerDev",
    "scouting",
    "recruiting",
  ]);

  const calulateCoachPoints = () => {
    const points = abilityPointsValues.reduce((prev, curr) => {
      curr = typeof curr !== "number" ? Number.parseInt(curr, 10) : curr;
      return curr + prev;
    }, 0);
    setValue("abilityPointsTotal", points);
    return points;
  };
  const calculateCoachPointsRemaining = () => {
    // Change for tier select
    return PRO_LEAGUE_INFO.pointLimits.total - calulateCoachPoints();
  };

  const handleOnClose = () => {
    reset();
    onClose();
  };
  const submitNewTeam: SubmitHandler<NewCollegeTeam> = (data) => {
    console.log(data);
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submitNewTeam)} noValidate>
      <JoinModal
        open={isOpen}
        type="college"
        mode={mode}
        onClose={handleOnClose}
      >
        <h3>Team Basics</h3>
        <div className="columns">
          <JoinCombobox
            colSize="6"
            name="team"
            label="Team Selection"
            control={control}
            options={availableTeams}
            renderOptionLabel={(team) => (
              <span>
                {team.name} {team.mascot}
              </span>
            )}
            renderOptionValue={(team) => team.id.toString()}
            help="You can search for your team by school name or mascot."
          />
          <JoinInput
            name="password"
            label="Team Password"
            type="password"
            colSize="6"
            control={control}
          />
        </div>
        <h3>Head Coach Basics</h3>
        <div className="columns is-multiline">
          <JoinInput
            name="firstName"
            label="First Name"
            colSize="4"
            control={control}
          />
          <JoinInput
            name="lastName"
            label="Last Name"
            colSize="4"
            control={control}
          />
          <JoinInput
            name="age"
            label="Age"
            type="number"
            colSize="2"
            control={control}
            min={25}
            max={75}
            help="Range: 25-75"
          />
          <JoinInput
            name="face"
            label="Face Picture Number"
            type="number"
            colSize="6"
            control={control}
            min={1}
            max={3022}
            help="Fill in the number of the matching picture from graphics/coaches/fac."
          />
          <JoinInput
            name="outfit"
            label="Outfit Picture Number"
            type="number"
            colSize="6"
            control={control}
            min={1}
            max={75}
            help="Fill in the number of the matching picture from graphics/nonplayers/clothes."
          />
        </div>
        <h3>Head Coach Ability Points</h3>
        {currentTier ? (
          <p>
            These are the skills that your head coach will have in evaluating
            players. For a Tier {currentTier} school, the minimum that each
            category can have is {tierValues[currentTier].min} and the maximum
            is {tierValues[currentTier].max}. The maximum sum of the categories
            is {tierValues[currentTier].total}.
          </p>
        ) : (
          <p>
            These are the skills that your head coach will have in evaluating
            players. Please select a team to view point limitations.
          </p>
        )}
        {COLLEGE_LEAGUE_INFO.pointLabels.map(({ key, label: { pro } }) => (
          <JoinInput
            key={key}
            label={pro}
            name={key as Path<NewCollegeTeam>}
            type="number"
            min={currentTier ? tierValues[currentTier].min : 0}
            max={currentTier ? tierValues[currentTier].max : 0}
            style={{ width: "6rem" }}
            control={control}
            disabled={!currentTier}
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
                  value={calculateCoachPointsRemaining()}
                  readOnly
                />
              </p>
              {errors.abilityPointsTotal && (
                <p className="help has-text-danger">
                  {errors.abilityPointsTotal.message as string}
                </p>
              )}
            </div>
          </div>
        </div>
      </JoinModal>
    </form>
  );
}
