import clsx from "clsx";
import type { InputHTMLAttributes } from "react";
import type { FieldValues, UseControllerProps } from "react-hook-form";
import { useController } from "react-hook-form";
import JoinField, { type AllFieldProps } from "./JoinField";

type SelectProps<T extends FieldValues, K> = AllFieldProps<T> &
  UseControllerProps<T> & {
    options: K[];
    renderOptionValue?: (option: K) => string | number | readonly string[];
    renderOptionLabel?: (option: K) => string;
  };

export default function Select<T extends FieldValues, K>(
  props: SelectProps<T, K> & InputHTMLAttributes<HTMLElement>,
) {
  const {
    name,
    label,
    colSize,
    help,
    horizontal,
    options,
    control,
    renderOptionLabel = (option) => option as string,
    renderOptionValue = (option) => option as string,
    ...rest
  } = props;

  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <JoinField
      name={name}
      label={label}
      error={error}
      colSize={colSize}
      help={help}
      horizontal={horizontal}
    >
      <div
        className={clsx(
          "select",
          error && "is-danger",
          colSize && colSize !== "narrow" && "is-fullwidth",
        )}
      >
        <select {...field} {...rest}>
          <option value={""} />
          {options.map((option) => {
            const optionValue = renderOptionValue(option);

            return (
              <option key={optionValue.toString()} value={optionValue}>
                {renderOptionLabel(option)}
              </option>
            );
          })}
        </select>
      </div>
    </JoinField>
  );
}
