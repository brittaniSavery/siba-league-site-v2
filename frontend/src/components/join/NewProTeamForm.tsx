import { LOW_TO_HIGH, PRO_LEAGUE_INFO, PRO_PERSONALITY } from "@lib/constants";
import type { NewProTeam, Team } from "@lib/types";
import { useForm, type Path, type SubmitHandler } from "react-hook-form";
import JoinField from "./JoinField";
import JoinInput from "./JoinInput";
import JoinModal from "./JoinModal";
import JoinSelect from "./JoinSelect";

type NewProTeamFormProps = {
  isOpen: boolean;
  mode: "add" | "edit";
  availableTeams: Team[];
  selectedTeam?: NewProTeam;
  onClose: () => void;
  onSubmit: (team: NewProTeam) => void;
};

export default function NewProTeamForm({
  isOpen,
  mode,
  availableTeams,
  selectedTeam,
  onClose,
  onSubmit,
}: NewProTeamFormProps) {
  const defaultFormValues: NewProTeam = selectedTeam || {
    firstName: "",
    lastName: "",
    password: "",
    face: 1,
    outfit: 1,
    age: 25,
    gender: "male",
    greed: "",
    personality: "",
    defense: 10,
    offense: 10,
    playerDev: 10,
    potential: 10,
    bballIQ: 10,
    team: null,
    abilityPointsTotal: 50,
  };

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<NewProTeam>({
    defaultValues: selectedTeam || defaultFormValues,
  });
  const selectedGender = watch("gender");
  const abilityPointsValues = watch([
    "offense",
    "defense",
    "playerDev",
    "potential",
    "bballIQ",
  ]);

  const calulateGMPoints = () => {
    const points = abilityPointsValues.reduce((prev, curr) => {
      curr = typeof curr !== "number" ? Number.parseInt(curr, 10) : curr;
      return curr + prev;
    }, 0);
    setValue("abilityPointsTotal", points);
    return points;
  };
  const calculateGMPointsRemaining = () => {
    return PRO_LEAGUE_INFO.pointLimits.total - calulateGMPoints();
  };

  const handleOnClose = () => {
    reset();
    onClose();
  };
  const submitNewTeam: SubmitHandler<NewProTeam> = (data) => {
    console.log(data);
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submitNewTeam)} noValidate>
      <JoinModal open={isOpen} type="pro" mode={mode} onClose={handleOnClose}>
        <h3>Team Basics</h3>
        <div className="columns">
          <JoinSelect
            colSize="3"
            name="team"
            label="Team Selection"
            control={control}
            options={availableTeams}
            renderOptionLabel={({ name }) => name}
            renderOptionValue={({ id }) => id.toString()}
          />
          <JoinInput
            name="password"
            label="Team Password"
            type="password"
            colSize="9"
            control={control}
          />
        </div>
        <h3>General Manager Basics</h3>
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
          <JoinField name="gender" colSize="2">
            <div className="radios is-flex is-flex-direction-column">
              <label className="radio" htmlFor="male">
                <input
                  {...register("gender")}
                  type="radio"
                  value="male"
                  id="male"
                  name="gender"
                  required
                />
                &nbsp;Male
              </label>
              <label className="radio" htmlFor="female">
                <input
                  {...register("gender")}
                  type="radio"
                  value="female"
                  id="female"
                  name="gender"
                />
                &nbsp;Female
              </label>
            </div>
          </JoinField>
          <JoinInput
            name="face"
            label="Face Picture Number"
            type="number"
            colSize="3"
            control={control}
            min={selectedGender === "male" ? 1 : 1000}
            max={selectedGender === "male" ? 999 : 1022}
            help="Fill in the number of the matching picture from graphics/nonplayers/fac."
          />
          <JoinInput
            name="outfit"
            label="Outfit Picture Number"
            type="number"
            colSize="3"
            control={control}
            min={selectedGender === "male" ? 1 : 1000}
            max={selectedGender === "male" ? 75 : 1015}
            help="Fill in the number of the matching picture from graphics/nonplayers/clothes."
          />
          <JoinSelect
            name="personality"
            options={[...PRO_PERSONALITY]}
            colSize="3"
            control={control}
          />
          <JoinSelect
            name="greed"
            options={[...LOW_TO_HIGH]}
            colSize="3"
            control={control}
          />
        </div>
        <h3>General Manager Ability Points</h3>
        <p>
          These are the skills that your general manager will have in evaluating
          players. The minimum that each category can have is{" "}
          {PRO_LEAGUE_INFO.pointLimits.min} and the maximum is{" "}
          {PRO_LEAGUE_INFO.pointLimits.max}. The maximum sum of the categories
          is {PRO_LEAGUE_INFO.pointLimits.total}.
        </p>
        <p>
          <b>Note:</b> All staff members play some role in the evaluation of
          player ratings. However, the head coach has the biggest influence in
          determining a player's rating, followed by the General Manager and
          then the assistant coaches in order of job seniority. In terms of
          player development, the General Manager plays <em>NO</em> role.
        </p>
        {PRO_LEAGUE_INFO.pointLabels.map(({ key, label: { pro } }) => (
          <JoinInput
            key={key}
            label={pro}
            name={key as Path<NewProTeam>}
            type="number"
            min={10}
            max={85}
            style={{ width: "6rem" }}
            control={control}
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
                  value={calculateGMPointsRemaining()}
                  readOnly
                />
              </p>
              {errors.abilityPointsTotal && (
                <p className="help has-text-danger-dark">
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
