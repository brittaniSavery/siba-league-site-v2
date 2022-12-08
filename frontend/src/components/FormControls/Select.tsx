import clsx from "clsx";
import type { InputHTMLAttributes } from "react";
import { useController } from "react-hook-form";
import type {
  FieldValues,
  UseControllerProps,
} from "react-hook-form/dist/types";
import FieldBase, { AllFieldProps } from "./FieldBase";

type SelectProps<T extends FieldValues, K> = AllFieldProps<T> &
  UseControllerProps<T> & {
    options: K[];
    renderOptionValue?: (option: K) => string;
    renderOptionLabel?: (option: K) => string;
  };

export default function Select<T extends FieldValues, K>(
  props: SelectProps<T, K> & InputHTMLAttributes<HTMLElement>
) {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  const {
    name,
    label,
    size,
    help,
    horizontal,
    options,
    renderOptionLabel = (option) => option as string,
    renderOptionValue = (option) => option as string,
    ...rest
  } = props;

  return (
    <FieldBase
      name={name}
      label={label}
      error={error}
      size={size}
      help={help}
      horizontal={horizontal}
    >
      <div
        className={clsx(
          "select",
          error && "is-danger",
          size && size !== "narrow" && "is-fullwidth"
        )}
      >
        <select {...field} {...rest}>
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
