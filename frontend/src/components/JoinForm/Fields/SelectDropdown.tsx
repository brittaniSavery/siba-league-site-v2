import clsx from "clsx";
import type { JoinSchema } from "../schema";
import type { RegisteredInputProps } from "./BaseInput";
import BaseInput from "./BaseInput";

type SelectDropdownProps<T> = RegisteredInputProps<JoinSchema> & {
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
    <BaseInput name={name} label={label} error={error}>
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
    </BaseInput>
  );
}
