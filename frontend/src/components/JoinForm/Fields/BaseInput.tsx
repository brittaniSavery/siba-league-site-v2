import type {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

import { capitalize } from "lodash-es";

type BaseInputProps<T extends FieldValues> = React.PropsWithChildren & {
  name: Path<T>;
  label?: string;
  placeHolder?: string;
  error?: FieldError;
};

export type RegisteredInputProps<T extends FieldValues> = BaseInputProps<T> & {
  register: UseFormRegister<T>;
  registerOptions?: RegisterOptions;
};

export default function BaseInput<T extends FieldValues>({
  name,
  label,
  error,
  children,
}: BaseInputProps<T>) {
  return (
    <div className="field">
      <label className="label">{label ?? capitalize(name)}</label>
      <div className="control">{children}</div>
      {error && <p className="help is-size-6 is-danger">{error.message}</p>}
    </div>
  );
}
