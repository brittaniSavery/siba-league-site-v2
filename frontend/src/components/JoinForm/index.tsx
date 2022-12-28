import Input from "@components/FormControls/Input";
import Select from "@components/FormControls/Select";
import Textarea from "@components/FormControls/Textarea";
import ProbationIcon from "@components/ProbationIcon";
import type { ProTeam, School } from "@lib/types";
import clsx from "clsx";
import { SubmitHandler, useForm } from "react-hook-form";

import { LEAGUE } from "@content/constants";
import { capitalize } from "lodash-es";
import { useState } from "react";

// import type { Member, ProTeam, School } from "@lib/types";
import { joiResolver } from "@hookform/resolvers/joi";
import ProTeamModal from "./ProTeamModal";
import { FOUND_CHOICES, JoinForm, joinFormSchema, ProTeamForm } from "./schema";
import SchoolModal from "./SchoolModal";

type JoinFormProps = {
  schools: School[];
  proTeams: ProTeam[];
};

export default function JoinForm({ schools, proTeams }: JoinFormProps) {
  const [teamView, setTeamView] = useState(LEAGUE.pro);
  const [showModal, setShowModal] = useState(false);

  const { handleSubmit, control, setValue } = useForm<JoinForm>({
    defaultValues: { name: "", email: "" },
    resolver: joiResolver(joinFormSchema),
  });

  // Submitting all the info for the join form
  const onSubmit: SubmitHandler<JoinForm> = (data, event) => {
    event?.preventDefault();
    event?.stopPropagation();
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input name="name" control={control} />
        <Input name="email" type="email" control={control} />
        <Select<JoinForm, { label: string; name: string }>
          name="found"
          label="Found SIBA from"
          control={control}
          options={FOUND_CHOICES}
          renderOptionValue={(option) => option.name}
          renderOptionLabel={(option) => option.label}
          rules={{ deps: "reason" }}
        />
        <Textarea name="reason" control={control} />
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
              have an exclamation icon (
              <ProbationIcon iconOnly />) are on probation.
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
      </form>

      <ProTeamModal
        isOpen={showModal && teamView === LEAGUE.pro}
        close={() => setShowModal(false)}
        options={proTeams}
        sendToMainForm={(data: ProTeamForm) => setValue("proTeam", data)}
      />

      <SchoolModal
        isOpen={showModal && teamView === LEAGUE.college}
        close={() => setShowModal(false)}
        options={schools}
      />
    </>
  );
}
