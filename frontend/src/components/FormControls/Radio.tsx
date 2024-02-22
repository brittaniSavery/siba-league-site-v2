import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import FieldBase, { type AllFieldProps } from "./FieldBase";

export default function Radio<T extends FieldValues>(
  props: AllFieldProps<T> &
    UseControllerProps<T> & {
      options: { label: string; value: string }[];
    }
) {
  const { name, label, colSize, help, horizontal, control, rules, options } =
    props;

  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules });

  return (
    <FieldBase
      name={name}
      label={label}
      error={error}
      colSize={colSize}
      help={help}
      horizontal={horizontal}
    >
      <div className="is-flex is-flex-direction-column">
        {options.map(({ label, value }) => (
          <label key={`radio-${name}-${label}`}>
            <input
              type={"radio"}
              value={value}
              checked={field.value === value}
              onChange={(e) => field.onChange(e.target.value)}
            />
            &nbsp;{label}
          </label>
        ))}
      </div>
    </FieldBase>
  );
}
