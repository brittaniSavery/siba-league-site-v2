import { capitalize } from "lodash-es";
import type { BasicInput } from "./fieldTypes";

type SelectDropdownProps<T> = BasicInput & {
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
    <div className="field">
      <label className="label">{label ?? capitalize(name)}</label>
      <div className="select">
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
      {error && <p className="help is-danger">{error.message}</p>}
    </div>
  );
}
