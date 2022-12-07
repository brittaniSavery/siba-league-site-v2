import clsx from "clsx";
import type { JoinSchema } from "../schema";
import type { RegisteredFieldProps } from "../../FormControls/FieldBase";
import FieldBase from "../../FormControls/FieldBase";

export default function TextInput({
  name,
  label,
  placeHolder,
  error,
  register,
  registerOptions,
  ...rest
}: RegisteredFieldProps<JoinSchema>) {
  return (
    <FieldBase name={name} label={label} error={error}>
      <input
        className={clsx("input", error && "is-danger")}
        type="text"
        placeholder={placeHolder ?? ""}
        {...register(name, registerOptions)}
        {...rest}
      />
    </FieldBase>
  );
}
