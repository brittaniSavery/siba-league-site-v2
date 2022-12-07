import { capitalize } from "lodash-es";
import type {
  FieldError,
  FieldPath,
  FieldValues,
} from "react-hook-form/dist/types";

export type FieldBaseProps<T extends FieldValues> = React.PropsWithChildren & {
  name: FieldPath<T>;
  label?: string;
  error?: FieldError;
};

export default function FieldBase<T extends FieldValues>({
  name,
  label,
  error,
  children,
}: FieldBaseProps<T>) {
  return (
    <div className="field">
      <label className="label">{label ?? capitalize(name)}</label>
      <div className="control">{children}</div>
      {error && <p className="help is-size-6 is-danger">{error.message}</p>}
    </div>
  );
}
