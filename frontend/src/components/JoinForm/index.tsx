import Input from "@components/FormControls/Input";
import Select from "@components/FormControls/Select";
import Textarea from "@components/FormControls/Textarea";
import ProbationIcon from "@components/ProbationIcon";
import type { ProTeam, School } from "@lib/types";
import clsx from "clsx";
import { SubmitHandler, useForm } from "react-hook-form";

import { LEAGUE } from "@content/constants";
import { capitalize, isEmpty } from "lodash-es";
import { useEffect, useState } from "react";

// import type { Member, ProTeam, School } from "@lib/types";
import { joiResolver } from "@hookform/resolvers/joi";
import ProTeamModal from "./modals/ProTeamModal";
import {
  CollegeTeamForm,
  FOUND_CHOICES,
  JoinForm,
  joinFormSchema,
  ProTeamForm,
} from "@lib/joinForm";
import SchoolModal from "./modals/SchoolModal";
import TeamCard from "./JoinCard";

type JoinFormProps = {
  schools: School[];
  proTeams: ProTeam[];
};

type Modal = {
  open: boolean;
  proValues?: ProTeamForm;
  collegeValues?: CollegeTeamForm;
};

export default function JoinForm({ schools, proTeams }: JoinFormProps) {
  const [teamView, setTeamView] = useState(LEAGUE.pro);
  const [modal, setModal] = useState<Modal>({ open: false });
  const [availableSchools, setAvailableSchools] = useState<School[]>(schools);

  const { handleSubmit, control, setValue, watch } = useForm<JoinForm>({
    defaultValues: { name: "", email: "" },
    resolver: joiResolver(joinFormSchema),
  });

  const proTeam = watch("proTeam");
  const collegeTeams = watch("collegeTeams");

  useEffect(() => {
    if (!collegeTeams) return;

    const selectedSchools = collegeTeams
      ? collegeTeams.map((form) => form.team)
      : [];

    if (isEmpty(selectedSchools)) return;

    setAvailableSchools(
      schools.filter((school) =>
        selectedSchools.every((selected) => selected?.name !== school.name)
      )
    );
  }, [collegeTeams]);

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
            <div className={clsx(teamView !== LEAGUE.pro && "is-hidden")}>
              <p>You are able to manage only one (1) pro team.</p>
              {proTeam && (
                <div className="columns pt-4">
                  <div className="column is-narrow">
                    <TeamCard
                      league={LEAGUE.pro}
                      form={proTeam}
                      onEdit={() =>
                        setModal({ open: true, proValues: proTeam })
                      }
                      onDelete={() => setValue("proTeam", undefined)}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className={clsx(teamView !== LEAGUE.college && "is-hidden")}>
              <p>
                You are allowed to coach up to three (3) teams. They each must
                be in different tiers and different recruiting regions. Teams
                that have an exclamation icon (
                <ProbationIcon iconOnly />) are on probation.
              </p>
              {collegeTeams && collegeTeams.length > 0 && (
                <div className="columns pt-4">
                  {collegeTeams &&
                    collegeTeams.map((current) => (
                      <div
                        key={`${current.team?.name}`}
                        className="column is-narrow"
                      >
                        <TeamCard
                          league={LEAGUE.college}
                          form={current}
                          onEdit={() =>
                            setModal({ open: true, collegeValues: current })
                          }
                          onDelete={() => {
                            const newTeams = collegeTeams.filter(
                              (form) =>
                                form.team?.mascot !== current.team?.mascot
                            );
                            setValue("collegeTeams", newTeams);
                          }}
                        />
                      </div>
                    ))}
                </div>
              )}
            </div>
            <button
              type="button"
              className="button is-primary is-light mt-4"
              disabled={
                (teamView === LEAGUE.pro && !!proTeam) ||
                (teamView === LEAGUE.college && collegeTeams?.length === 3)
              }
              onClick={() => setModal({ open: true })}
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
        isOpen={modal.open && teamView === LEAGUE.pro}
        close={() => setModal({ open: false })}
        options={proTeams}
        selectedForm={modal.proValues}
        sendToMainForm={(data: ProTeamForm) => setValue("proTeam", data)}
      />

      <SchoolModal
        isOpen={modal.open && teamView === LEAGUE.college}
        close={() => setModal({ open: false })}
        options={availableSchools}
        selectedForm={modal.collegeValues}
        sendToMainForm={(data: CollegeTeamForm) => {
          const newCollegeTeams = collegeTeams
            ? [...collegeTeams, data]
            : [data];
          setValue("collegeTeams", newCollegeTeams);
        }}
      />
    </>
  );
}
