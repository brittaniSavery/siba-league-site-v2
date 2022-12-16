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
  ...rest
}: FieldBaseProps<T>) {
  if (horizontal) {
    return (
      <div
        className={clsx("field is-horizontal", !!size && `column is-${size}`)}
        {...rest}
      >
        <div className="field-label">
          <label className="label">{label ?? capitalize(name)}</label>
        </div>
        <div className="field-body">
          <div className="field">
            <div className="control">{children}</div>
            {error && (
              <p className="help has-text-danger-dark">{error.message}</p>
            )}
            {!error && help && <p className="help">{help}</p>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx("field", !!size && `column is-${size}`)} {...rest}>
      <label className="label">{label ?? capitalize(name)}</label>
      <div className="control">{children}</div>
      {error && <p className="help has-text-danger-dark">{error.message}</p>}
      {!error && help && <p className="help">{help}</p>}
    </div>
  );
}
