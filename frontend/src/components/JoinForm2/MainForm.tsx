import { Input, Select, Textarea } from "@components/FormControls";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { FOUND_BY, type MainForm } from "./lib";
import { useContext, useEffect } from "react";
import { TeamsContext } from "./contexts/TeamsContext";

export default function MainForm() {
  const {
    formTeams: { selected },
  } = useContext(TeamsContext) as TeamsContext;
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<MainForm>();

  useEffect(() => {
    register("teams");
  }, []);

  const onSubmit = (data: MainForm) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        name="name"
        disabled={isSubmitting}
        control={control}
        rules={{
          required: { value: true, message: "Please enter your name." },
        }}
      />
      <Input
        name="email"
        disabled={isSubmitting}
        control={control}
        rules={{
          required: {
            value: true,
            message: "Please enter your email address.",
          },
          pattern: {
            value: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm,
            message: "Please enter a valid email address.",
          },
        }}
      />
      <Select
        name="found"
        label="Found SIBA from"
        options={FOUND_BY}
        renderOptionLabel={(option) => option.label}
        renderOptionValue={(option) => option.id}
        disabled={isSubmitting}
        control={control}
        rules={{
          required: {
            value: true,
            message: "Please select how you found our league.",
          },
        }}
      />
      <Textarea
        label="Reason (optional)"
        name="reason"
        disabled={isSubmitting}
        control={control}
      />
      {/* <TeamPicks /> */}
      <button
        type="submit"
        className={clsx("button is-primary mb-5", isSubmitting && "is-loading")}
      >
        Join
      </button>
    </form>
  );
}
