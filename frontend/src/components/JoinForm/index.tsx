import TextInput from "@components/JoinForm/Fields/TextInput";

import { joiResolver } from "@hookform/resolvers/joi";
import { useEffect } from "react";

// import type { Member, ProTeam, School } from "@lib/types";
import { useForm } from "react-hook-form";
import SelectDropdown from "./Fields/SelectDropdown";
import TextareaInput from "./Fields/TextareaInput";
import { FoundChoices, JoinSchema, joinValidation } from "./schema";

// type JoinFormProps = {
//   schools: School[];
//   coaches: Member[];
//   proTeams: ProTeam[];
//   gms: Member[];
// };

export default function JoinForm() {
  const {
    register,
    handleSubmit,
    trigger,
    formState,
    formState: { errors },
  } = useForm<JoinSchema>({
    resolver: joiResolver(joinValidation),
  });

  useEffect(() => {
    console.log(errors);
  }, [formState]);

  const onSubmit = (data: JoinSchema) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput name="name" error={errors.name} register={register} />
      <TextInput name="email" error={errors.email} register={register} />
      <SelectDropdown
        name="found"
        label="Found SIBA from"
        options={FoundChoices}
        renderOptionValue={(option) => option.name}
        renderOptionLabel={(option) => option.label}
        error={errors.found}
        register={register}
        registerOptions={{ deps: "reason" }}
      />
      <TextareaInput name="reason" error={errors.reason} register={register} />
      <div className="content mt-5">
        <h2>Pick Your Teams</h2>
        <p>
          This is where your team choices will appear after adding them by
          clicking the &quot;Add&quot; button for pro or college teams. Feel
          free to only add a pro league or just some college teams. At least one
          team is required before submitting the form.
        </p>
      </div>
      <button type="submit" className="button is-primary">
        Join
      </button>
    </form>
  );
}
