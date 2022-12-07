import clsx from "clsx";
import type { FieldValues } from "react-hook-form";
import type { RegisteredFieldProps } from "./FieldBase";
import FieldBase from "./FieldBase";

type SelectProps<T extends FieldValues> = RegisteredFieldProps<T> & {
  options: T[];
  renderOptionValue: (option: T) => string;
  renderOptionLabel: (option: T) => string;
};

export default function Select<T extends FieldValues>({
  name,
  label,
  options,
  renderOptionValue,
  renderOptionLabel,
  error,
  register,
  registerOptions,
  ...rest
}: SelectProps<T>) {
  return (
    <FieldBase name={name} label={label} error={error}>
      <div className={clsx("select", error && "is-danger")}>
        <select {...register(name, registerOptions)} {...rest}>
          <option value={""} />
          {options.map((option) => {
            const optionValue = renderOptionValue(option);

            return (
              <option key={optionValue} value={optionValue}>
                {renderOptionLabel(option)}
              </option>
            );
          })}
        </select>
      </div>
    </FieldBase>
  );
}
