import clsx from "clsx";
import { capitalize } from "lodash-es";
import type {
  FieldError,
  FieldPath,
  FieldValues,
} from "react-hook-form/dist/types";

export type AllFieldProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label?: string;
  size?: string | number;
  help?: string;
  horizontal?: boolean;
};

type FieldBaseProps<T extends FieldValues> = AllFieldProps<T> &
  React.PropsWithChildren & {
    error?: FieldError;
  };

export default function FieldBase<T extends FieldValues>({
  name,
  label,
  size,
  error,
  help,
  horizontal = false,
  children,
}: FieldBaseProps<T>) {
  const LabelContainer = ({ children }: React.PropsWithChildren) =>
    horizontal ? (
      <div className="field-label">{children}</div>
    ) : (
      <>{children}</>
    );
  const FieldContainer = ({ children }: React.PropsWithChildren) =>
    horizontal ? <div className="field-body">{children}</div> : <>{children}</>;

  return (
    <div className={clsx("field", !!size && `column is-${size}`)}>
      <label className="label">{label ?? capitalize(name)}</label>
      <div className="control">{children}</div>
      {error && <p className="help has-text-danger-dark">{error.message}</p>}
      {!error && help && <p className="help">{help}</p>}
    </div>
  );
}
