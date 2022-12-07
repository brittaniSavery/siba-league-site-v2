import clsx from "clsx";
import type { InputHTMLAttributes } from "react";
import { useController } from "react-hook-form";
import type {
  FieldValues,
  UseControllerProps,
} from "react-hook-form/dist/types";
import FieldBase from "./FieldBase";

type InputProps<T extends FieldValues> = UseControllerProps<T> & {
  label?: string;
};

export default function Input<T extends FieldValues>(
  props: InputProps<T> & InputHTMLAttributes<HTMLElement>
) {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  const { name, label, ...rest } = props;

  return (
    <FieldBase name={name} label={label} error={error}>
      <input
        {...field}
        className={clsx("input", error && "is-danger")}
        {...rest}
      />
    </FieldBase>
  );
}
