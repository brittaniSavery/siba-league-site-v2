import Input from "@components/FormControls/Input";
import Select from "@components/FormControls/Select";
import Textarea from "@components/FormControls/Textarea";
import ProbationIcon from "@components/College/ProbationIcon";
import type { ProTeam, School } from "@lib/types";
import clsx from "clsx";
import {
  FieldError,
  SubmitHandler,
  useForm,
  useFieldArray,
} from "react-hook-form";

import { LEAGUE } from "@lib/constants";
import { capitalize, delay, isEmpty, isNil } from "lodash-es";
import { useEffect, useState } from "react";

import { joiResolver } from "@hookform/resolvers/joi";
import {
  CollegeTeamForm,
  FOUND_CHOICES,
  JoinForm,
  joinFormSchema,
  ProTeamForm,
} from "@lib/joinForm";
import TeamCard from "./JoinCard";
import ProTeamModal from "./modals/ProTeamModal";
import SchoolModal from "./modals/SchoolModal";
import JoinResults from "./JoinResults";

type JoinFormProps = {
  schools: School[];
  proTeams: ProTeam[];
};

type Modal = {
  open: boolean;
  mode?: "add" | "edit";
  index?: number;
  proValues?: ProTeamForm;
  collegeValues?: CollegeTeamForm;
};

type EmailSentResults = {
  result: {
    member: { isSuccessful: boolean };
    commissioner: { isSuccessful: boolean };
  };
};

export type JoinFormResults = {
  memberName: string;
  isMemberEmailSuccessful: boolean;
  isCommissionerEmailSuccessful: boolean;
};

export default function JoinForm({ schools, proTeams }: JoinFormProps) {
  const [teamView, setTeamView] = useState(LEAGUE.pro);
  const [modal, setModal] = useState<Modal>({ open: false });
  const [availableSchools, setAvailableSchools] = useState<School[]>(schools);
  const [formResults, setFormResults] = useState<JoinFormResults>();

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    trigger,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<JoinForm>({
    defaultValues: { name: "", email: "" },
    resolver: joiResolver(joinFormSchema),
  });

  const {
    fields: collegeTeams,
    remove,
    update,
    append,
  } = useFieldArray({
    name: "collegeTeams",
    control,
  });

  const proTeam = watch("proTeam");

  useEffect(() => {
    if (!collegeTeams) return;

    let selectedSchools = collegeTeams
      ? collegeTeams.map((form) => form.team)
      : [];

    if (isEmpty(selectedSchools)) return;

    selectedSchools = selectedSchools.filter(
      (school) => school?.name !== modal.collegeValues?.team?.name
    );

    setAvailableSchools(
      schools.filter((school) =>
        selectedSchools.every((selected) => selected?.name !== school.name)
      )
    );
  }, [collegeTeams, modal]);

  // Submitting all the info for the join form
  const onSubmit: SubmitHandler<JoinForm> = async (data, event) => {
    event?.preventDefault();
    event?.stopPropagation();

    if (import.meta.env.DEV) {
      return delay(
        () =>
          setFormResults({
            memberName: data.name,
            isCommissionerEmailSuccessful: true,

            isMemberEmailSuccessful: true,
          }),
        1000
      );
    }

    const sendJoinEmails = await fetch(import.meta.env.PUBLIC_JOIN_URL, {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (sendJoinEmails.ok) {
      const emailsSent = (await sendJoinEmails.json()) as EmailSentResults;

      setFormResults({
        memberName: data.name,
        isCommissionerEmailSuccessful:
          emailsSent.result.commissioner.isSuccessful,
        isMemberEmailSuccessful: emailsSent.result.member.isSuccessful,
      });
      reset();
    }
  };

  if (isSubmitSuccessful && !!formResults) {
    return <JoinResults {...formResults} />;
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input name="name" control={control} disabled={isSubmitting} />
        <Input
          name="email"
          type="email"
          control={control}
          disabled={isSubmitting}
        />
        <Select<JoinForm, { label: string; name: string }>
          name="found"
          label="Found SIBA from"
          control={control}
          options={FOUND_CHOICES}
          renderOptionValue={(option) => option.name}
          renderOptionLabel={(option) => option.label}
          rules={{ deps: "reason" }}
          disabled={isSubmitting}
        />
        <Textarea name="reason" control={control} disabled={isSubmitting} />
        <div className="content mt-5">
          <h2>Pick Your Teams</h2>
          <p>
            This is where your team choices will appear after adding them by
            clicking the &quot;Add&quot; button for pro or college teams. Feel
            free to only add a pro league or just some college teams. At least
            one team is required before submitting the form.
          </p>
        </div>
        {errors.proTeam && (
          <div className="notification is-danger is-light">
            <strong>Error!</strong> {errors.proTeam.message}
          </div>
        )}
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
                        setModal({
                          open: true,
                          mode: "edit",
                          proValues: proTeam,
                        })
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
                    collegeTeams.map((current, index) => (
                      <div key={current.id} className="column is-4">
                        <TeamCard
                          league={LEAGUE.college}
                          form={current}
                          error={
                            errors.collegeTeams &&
                            (errors.collegeTeams[index] as FieldError)
                          }
                          onEdit={() =>
                            setModal({
                              open: true,
                              mode: "edit",
                              index: index,
                              collegeValues: current,
                            })
                          }
                          onDelete={() => remove(index)}
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
                (teamView === LEAGUE.college && collegeTeams?.length === 3) ||
                isSubmitting
              }
              onClick={() => setModal({ open: true })}
            >
              Add {capitalize(teamView)} Team
            </button>
          </div>
        </div>
        <button
          type="submit"
          className={clsx("button is-primary", isSubmitting && "is-loading")}
        >
          Join
        </button>
      </form>

      <ProTeamModal
        id="proModal"
        isOpen={modal.open && teamView === LEAGUE.pro}
        close={() => setModal({ open: false })}
        mode={modal.mode}
        options={proTeams}
        selectedForm={modal.proValues}
        sendToMainForm={async (data: ProTeamForm) => {
          setValue("proTeam", data);
          await trigger("proTeam");
        }}
      />

      <SchoolModal
        id="collegeModal"
        isOpen={modal.open && teamView === LEAGUE.college}
        close={() => setModal({ ...modal, open: false })}
        mode={modal.mode}
        options={availableSchools}
        selectedForm={modal.collegeValues}
        sendToMainForm={async (data: CollegeTeamForm) => {
          if (!isNil(modal.index)) {
            update(modal.index, data);
          } else {
            append(data);
          }

          await trigger("collegeTeams");
        }}
      />
    </>
  );
}
