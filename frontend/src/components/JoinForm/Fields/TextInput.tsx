import clsx from "clsx";
import type { JoinSchema } from "../schema";
import type { RegisteredInputProps } from "./BaseInput";
import BaseInput from "./BaseInput";

export default function TextInput({
  name,
  label,
  placeHolder,
  error,
  register,
  registerOptions,
}: RegisteredInputProps<JoinSchema>) {
  return (
    <BaseInput name={name} label={label} error={error}>
      <input
        className={clsx("input", error && "is-danger")}
        type="text"
        placeholder={placeHolder ?? ""}
        {...register(name, registerOptions)}
      />
    </BaseInput>
  );
}
