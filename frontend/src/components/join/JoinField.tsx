import clsx from "clsx";
import { capitalize } from "radashi";
import type { FieldError, FieldPath, FieldValues } from "react-hook-form";

export type AllFieldProps<T extends FieldValues> = {
  name: FieldPath<T>;
  label?: string;
  colSize?: string;
  help?: string;
  horizontal?: boolean;
};

type JoinFieldProps<T extends FieldValues> = AllFieldProps<T> &
  React.PropsWithChildren & {
    error?: FieldError;
  };

export default function JoinField<T extends FieldValues>({
  name,
  label,
  colSize,
  error,
  help,
  horizontal = false,
  children,
  ...rest
}: JoinFieldProps<T>) {
  if (horizontal) {
    return (
      <div
        className={clsx(
          "field is-horizontal",
          colSize && `column is-${colSize}`,
        )}
        {...rest}
      >
        <div className="field-label">
          <label className="label">{label ?? capitalize(name)}</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">{children}</div>
            {error && <p className="help has-text-danger">{error.message}</p>}
            {!error && help && <p className="help">{help}</p>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx("field", colSize && `column is-${colSize}`)} {...rest}>
      <label className="label">{label ?? capitalize(name)}</label>
      <div className="control">{children}</div>
      {error && <p className="help has-text-danger">{error.message}</p>}
      {!error && help && <p className="help">{help}</p>}
    </div>
  );
}
