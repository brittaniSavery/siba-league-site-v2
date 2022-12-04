import clsx from "clsx";
import type { JoinSchema } from "../schema";
import type { RegisteredInputProps } from "./BaseInput";
import BaseInput from "./BaseInput";

export default function TextareaInput({
  name,
  label,
  placeHolder,
  error,
  register,
  registerOptions,
}: RegisteredInputProps<JoinSchema>) {
  return (
    <BaseInput name={name} label={label} error={error}>
      <textarea
        className={clsx("textarea", error && "is-danger")}
        placeholder={placeHolder ?? ""}
        {...register(name, registerOptions)}
      />
    </BaseInput>
  );
}
