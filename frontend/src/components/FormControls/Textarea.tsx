import clsx from "clsx";
import type { FieldValues } from "react-hook-form";
import type { RegisteredFieldProps } from "./FieldBase";
import FieldBase from "./FieldBase";

export default function Textarea<T extends FieldValues>({
  name,
  label,
  error,
  register,
  registerOptions,
  ...rest
}: RegisteredFieldProps<T>) {
  return (
    <FieldBase name={name} label={label} error={error}>
      <textarea
        className={clsx("textarea", error && "is-danger")}
        {...register(name, registerOptions)}
        {...rest}
      />
    </FieldBase>
  );
}
