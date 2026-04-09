import type {
  NewCollegeTeam,
  NewProTeam,
  ProTeam,
  School,
  Team,
} from "@lib/types";
import {
  useFieldArray,
  useForm,
  useWatch,
  type SubmitHandler,
} from "react-hook-form";
import SelectedTeams from "./SelectedTeams";
import { useState } from "react";
import NewProTeamForm from "./NewProTeamForm";
import NewCollegeTeamForm from "./NewCollegeTeamForm";
import JoinInput from "./JoinInput";
import JoinSelect from "./JoinSelect";
import JoinField from "./JoinField";

type JoinFormProps = {
  availableProTeams: Team[];
  availableSchools: School[];
};

type JoinFormInputs = {
  name: string;
  email: string;
  discord: string;
  foundFrom: "devs" | "referral" | "google" | "socials" | "other";
  reason?: string;
  pro?: NewProTeam;
  college?: NewCollegeTeam[];
};

export default function JoinForm({
  availableProTeams,
  availableSchools,
}: JoinFormProps) {
  const [currentProTeams, setCurrentProTeams] =
    useState<Team[]>(availableProTeams);
  const [currentSchools, setCurrentSchools] =
    useState<School[]>(availableSchools);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [type, setType] = useState<"pro" | "college">("pro");
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<JoinFormInputs>();
  const proTeam = useWatch({ name: "pro", control });
  const {
    fields: collegeTeams,
    append,
    remove,
    update,
  } = useFieldArray({
    control,
    name: "college",
  });

  const onSubmit: SubmitHandler<JoinFormInputs> = (data) => console.log(data);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <JoinInput
          name="name"
          label="Name"
          control={control}
          placeholder="e.g. first name or nickname"
        />
        <JoinInput
          name="email"
          label="Email"
          control={control}
          placeholder="e.g. example@email.com"
          type="email"
        />
        <JoinInput
          name="discord"
          label="Discord Username"
          control={control}
          placeholder="e.g. user_name"
          help="Creating a new discord account is not required."
        />

        <JoinSelect
          name="foundFrom"
          label="Found SIBA from"
          control={control}
          options={[
            { value: "devs", label: "Wolverine Studios" },
            { value: "referral", label: "Family or Friend" },
            { value: "google", label: "Google" },
            { value: "socials", label: "Twitter, Bluesky, etc." },
            { value: "other", label: "Other (Please provide below)" },
          ]}
          renderOptionLabel={(option) => option.label}
          renderOptionValue={(option) => option.value}
        />

        <JoinField
          name="reason"
          label="Reason for joining"
          help="Optional: Let us know why you're interested in joining SIBA!"
          error={errors.reason}
        >
          <textarea
            {...register("reason")}
            id="reason"
            className="textarea"
            placeholder="e.g. I'm interested in joining because..."
          ></textarea>
        </JoinField>

        <div className="content mt-5">
          <h2>Select Your Teams</h2>
          <p>
            Choose your teams for the either the pro league, the college league,
            or both. You must have at least one team selected before submitting
            the form.
          </p>
        </div>
        <SelectedTeams
          pro={proTeam}
          college={collegeTeams}
          onAdd={(type: "pro" | "college") => {
            setType(type);
            setMode("add");
            setIsOpen(true);
          }}
          onEdit={() => {}}
          onDelete={() => {}}
        />
        <button type="submit" className="button is-primary mt-4">
          Join
        </button>
      </form>
      <NewProTeamForm
        availableTeams={currentProTeams}
        onSubmit={() => {}}
        isOpen={isOpen && type === "pro"}
        mode={mode}
        onClose={() => setIsOpen(false)}
      />
      <NewCollegeTeamForm
        availableTeams={currentSchools}
        onSubmit={() => {}}
        isOpen={isOpen && type === "college"}
        mode={mode}
        onClose={() => setIsOpen(false)}
      />
      {/* Add Delete Confirmation Modal */}
    </>
  );
}
