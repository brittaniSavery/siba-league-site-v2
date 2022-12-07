import Form from "@components/FormControls/Form";
import Input from "@components/FormControls/Input";
import Select from "@components/FormControls/Select";
import Textarea from "@components/FormControls/Textarea";
import ProbationIcon from "@components/ProbationIcon";
import { LEAGUE } from "@content/constants";

import clsx from "clsx";
import { capitalize } from "lodash-es";
import { useEffect, useState } from "react";
import type { SubmitHandler } from "react-hook-form";

// import type { Member, ProTeam, School } from "@lib/types";
import { FoundChoices, JoinSchema, joinValidation } from "./schema";
import TeamModal from "./TeamModal";

// type JoinFormProps = {
//   schools: School[];
//   coaches: Member[];
//   proTeams: ProTeam[];
//   gms: Member[];
// };

export default function JoinForm() {
  const [teamView, setTeamView] = useState(LEAGUE.pro);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log(teamView);
    console.log(showModal);
  });

  const onSubmit: SubmitHandler<JoinSchema> = (data, event) => {
    event?.preventDefault();
    event?.stopPropagation();
    console.log(data);
  };

  return (
    <>
      <Form<JoinSchema>
        id="join"
        onSubmit={onSubmit}
        validation={joinValidation}
      >
        <Input name="name" />
        <Input name="email" type="email" />
        <Select<JoinSchema, { label: string; name: string }>
          name="found"
          label="Found SIBA from"
          options={FoundChoices}
          renderOptionValue={(option) => option.name}
          renderOptionLabel={(option) => option.label}
          rules={{ deps: "reason" }}
        />
        <Textarea name="reason" />
        {/* <TextInput name="name" error={errors.name} register={register} />
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
        <TextareaInput
          name="reason"
          error={errors.reason}
          register={register}
        /> */}
        <div className="content mt-5">
          <h2>Pick Your Teams</h2>
          <p>
            This is where your team choices will appear after adding them by
            clicking the &quot;Add&quot; button for pro or college teams. Feel
            free to only add a pro league or just some college teams. At least
            one team is required before submitting the form.
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
                <li
                  className={clsx(teamView === LEAGUE.college && "is-active")}
                >
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
              Remember that you can coach up to three (3) teams. They each must
              be in different tiers and different recruiting regions. Teams that
              have an exclamation icon (<ProbationIcon iconOnly />) are on
              probation.
            </p>
            <button
              type="button"
              className="button is-primary is-light mt-2"
              onClick={() => setShowModal(true)}
            >
              Add {capitalize(teamView)} Team
            </button>
          </div>
        </div>
        <button type="submit" className="button is-primary">
          Join
        </button>
      </Form>

      <TeamModal
        isOpen={showModal}
        league={teamView}
        close={() => setShowModal(false)}
      />
    </>
  );
}
