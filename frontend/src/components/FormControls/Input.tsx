import clsx from "clsx";
import type { InputHTMLAttributes } from "react";
import { useController } from "react-hook-form";
import type {
  FieldValues,
  UseControllerProps,
} from "react-hook-form/dist/types";
import FieldBase, { AllFieldProps } from "./FieldBase";

export default function Input<T extends FieldValues>(
  props: AllFieldProps<T> &
    UseControllerProps<T> &
    InputHTMLAttributes<HTMLElement>
) {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  const { name, label, size, help, horizontal, ...rest } = props;

  return (
    <FieldBase
      name={name}
      label={label}
      error={error}
      size={size}
      help={help}
      horizontal={horizontal}
    >
      <input
        onChange={field.onChange}
        onBlur={field.onBlur}
        className={clsx("input", error && "is-danger")}
        {...rest}
      />
    </FieldBase>
  );
}
