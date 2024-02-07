import { FormProvider, useFieldArray, useForm } from "react-hook-form";

import Input from "@components/FormControls/Input.tsx";
import clsx from "clsx";
import type { MainForm } from "./lib.ts";
import Textarea from "@components/FormControls/Textarea.tsx";
import TeamPicks from "./TeamPicks.tsx";

export default function JoinForm2() {
  const methods = useForm<MainForm>();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (data: MainForm) => console.log(data);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input name="name" disabled={isSubmitting} />
        <Input name="email" disabled={isSubmitting} />
        <Textarea name="reason" disabled={isSubmitting} />
        <TeamPicks />
        <button
          type="submit"
          className={clsx("button is-primary", isSubmitting && "is-loading")}
        >
          Join
        </button>
      </form>
    </FormProvider>
  );
}
