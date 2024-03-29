import clsx from "clsx";
import type { InputHTMLAttributes } from "react";
import { useController } from "react-hook-form";
import type {
  FieldValues,
  UseControllerProps,
} from "react-hook-form/dist/types";
import FieldBase, { AllFieldProps } from "./FieldBase";

type TextareaProps<T extends FieldValues> = AllFieldProps<T> &
  UseControllerProps<T>;

export default function Textarea<T extends FieldValues>(
  props: TextareaProps<T> & InputHTMLAttributes<HTMLElement>
) {
  const { name, label, colSize, help, horizontal, control, ...rest } = props;

  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <FieldBase
      name={name}
      label={label}
      error={error}
      colSize={colSize}
      help={help}
      horizontal={horizontal}
    >
      <textarea
        {...field}
        className={clsx("textarea", error && "is-danger")}
        {...rest}
      />
    </FieldBase>
  );
}
