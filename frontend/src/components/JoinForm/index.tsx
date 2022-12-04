import TextInput from "@components/JoinForm/Fields/TextInput";
import { LEAGUE } from "@content/constants";

import { joiResolver } from "@hookform/resolvers/joi";
import clsx from "clsx";
import { capitalize } from "lodash-es";
import { useEffect, useState } from "react";

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
  const [teamView, setTeamView] = useState(LEAGUE.pro);

  useEffect(() => {
    console.log(errors);
  }, [formState]);

  const onSubmit = (data: JoinSchema) => {
    console.log(data);
  };

  return (
    <form id="join" onSubmit={handleSubmit(onSubmit)}>
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
      <div className="field card is-shadowless">
        <div className="card-header is-shadowless has-background-light pt-2 px-2">
          <div className="tabs is-boxed">
            <ul>
              <li className={clsx(teamView === LEAGUE.pro && "is-active")}>
                <a onClick={() => setTeamView(LEAGUE.pro)}>
                  {capitalize(LEAGUE.pro)}
                </a>
              </li>
              <li className={clsx(teamView === LEAGUE.college && "is-active")}>
                <a onClick={() => setTeamView(LEAGUE.college)}>
                  {capitalize(LEAGUE.college)}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="card-content">
          <p className={clsx(teamView !== LEAGUE.pro && "is-hidden")}>
            If you&apos;re an artist and would like to create a new logo for
            your team, be sure to let the commissioners when joining our
            community on Slack. We love creativity!
          </p>

          <p className={clsx(teamView !== LEAGUE.college && "is-hidden")}>
            Remember that you can coach up to three (3) teams. They each must be
            in different tiers and different recruiting regions. Teams that have
            an exclamation icon (
            <span className="icon has-text-danger-dark">
              <i className="fa-solid fa-circle-exclamation" />
            </span>
            ) are on probation.
          </p>
        </div>
      </div>
      <button type="submit" className="button is-primary">
        Join
      </button>
    </form>
  );
}
