import clsx from "clsx";
import { forwardRef } from "react";

interface InputProps {
  name: string;
  label: string;
  type: string;
  errors: object;
  placeholder?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, label, type, errors, ...rest }, ref) => {
    return (
      <div className="field">
        <label className="label" htmlFor={name}>
          {label}
        </label>
        <div className="control">
          <input
            className={clsx("input", errors[name] && "is-danger")}
            name={name}
            type={type}
            {...rest}
            ref={ref}
          />
        </div>
        {errors[name] && (
          <p className="help is-danger">{errors[name].message}</p>
        )}
      </div>
    );
  }
);

Input.displayName = Input.name;

export default Input;
