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
  const { name, label, columnSize, help, horizontal, control, ...rest } = props;

  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <FieldBase
      name={name}
      label={label}
      error={error}
      columnSize={columnSize}
      help={help}
      horizontal={horizontal}
    >
      <input
        className={clsx("input", error && "is-danger")}
        {...field}
        {...rest}
      />
    </FieldBase>
  );
}
