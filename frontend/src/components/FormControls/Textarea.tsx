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
      <textarea
        {...field}
        className={clsx("textarea", error && "is-danger")}
        {...rest}
      />
    </FieldBase>
  );
}
