import clsx from "clsx";
import type { InputHTMLAttributes } from "react";
import { Controller } from "react-hook-form";
import type { UseControllerProps } from "react-hook-form/dist/types";
import FieldBase from "./FieldBase";

interface InputProps extends UseControllerProps {
  label?: string;
}

export default function Input({
  name,
  rules,
  label,
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Controller
      name={name}
      rules={rules}
      render={({ fieldState: { error } }) => {
        return (
          <FieldBase name={name} label={label} error={error}>
            <input className={clsx("input", error && "is-danger")} {...rest} />
          </FieldBase>
        );
      }}
    />
  );
}
