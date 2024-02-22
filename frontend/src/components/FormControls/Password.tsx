import clsx from "clsx";
import { useState, type InputHTMLAttributes } from "react";
import { useController } from "react-hook-form";
import type { FieldValues, UseControllerProps } from "react-hook-form";
import FieldBase, { type AllFieldProps } from "./FieldBase";

export default function Password<T extends FieldValues>(
  props: AllFieldProps<T> &
    UseControllerProps<T> &
    InputHTMLAttributes<HTMLElement>
) {
  const { name, label, colSize, help, horizontal, control, rules, ...rest } =
    props;

  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FieldBase
      name={name}
      label={label}
      error={error}
      colSize={colSize}
      help={help}
      horizontal={horizontal}
    >
      <div className="field has-addons">
        <div className="control is-expanded">
          <input
            type={showPassword ? "text" : "password"}
            className={clsx("input", error && "is-danger")}
            autoComplete="new-password"
            {...field}
            {...rest}
          />
        </div>
        <div className="control">
          <button
            type="button"
            className="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <span className="icon">
              <i
                aria-hidden
                className={clsx(
                  "fa-solid",
                  showPassword ? "fa-eye-slash" : "fa-eye"
                )}
              ></i>
            </span>
          </button>
        </div>
      </div>
    </FieldBase>
  );
}
