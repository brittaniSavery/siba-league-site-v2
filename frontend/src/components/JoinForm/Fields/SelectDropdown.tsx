import clsx from "clsx";
import type { JoinSchema } from "../schema";
import type { RegisteredFieldProps } from "../../FormControls/FieldBase";
import FieldBase from "../../FormControls/FieldBase";

type SelectDropdownProps<T> = RegisteredFieldProps<JoinSchema> & {
  options: T[];
  renderOptionValue: (option: T) => string;
  renderOptionLabel: (option: T) => string;
};

export default function SelectDropdown<T>({
  name,
  label,
  options,
  renderOptionValue,
  renderOptionLabel,
  error,
  register,
  registerOptions,
}: SelectDropdownProps<T>) {
  return (
    <FieldBase name={name} label={label} error={error}>
      <div className={clsx("select", error && "is-danger")}>
        <select {...register(name, registerOptions)}>
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
