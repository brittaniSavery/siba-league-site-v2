import clsx from "clsx";
import type { JoinSchema } from "../schema";
import type { RegisteredFieldProps } from "../../FormControls/FieldBase";
import FieldBase from "../../FormControls/FieldBase";

export default function TextareaInput({
  name,
  label,
  placeHolder,
  error,
  register,
  registerOptions,
}: RegisteredFieldProps<JoinSchema>) {
  return (
    <FieldBase name={name} label={label} error={error}>
      <textarea
        className={clsx("textarea", error && "is-danger")}
        placeholder={placeHolder ?? ""}
        {...register(name, registerOptions)}
      />
    </FieldBase>
  );
}
