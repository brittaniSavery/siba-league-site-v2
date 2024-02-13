import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import clsx from "clsx";
import Input from "@components/FormControls/Input.tsx";
import Textarea from "@components/FormControls/Textarea.tsx";
import TeamPicks from "./TeamPicks.tsx";

import type { MainForm } from "./lib.ts";
import type { ProTeam, School } from "@lib/types.ts";

type JoinForm2Props = {
  pro: ProTeam[];
  college: School[];
};

export default function JoinForm2({ pro, college }: JoinForm2Props) {
  const methods = useForm<MainForm>();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data: MainForm) => console.log(data);

  const isProAvailable = !!pro.length;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input name="name" disabled={isSubmitting} />
        <Input name="email" disabled={isSubmitting} />
        <Textarea name="reason" disabled={isSubmitting} />
        <TeamPicks isProAvailable />
        <button
          type="submit"
          className={clsx(
            "button is-primary mb-5",
            isSubmitting && "is-loading"
          )}
        >
          Join
        </button>
      </form>
    </FormProvider>
  );
}
