import { joiResolver } from "@hookform/resolvers/joi";
import type Joi from "joi";
import { createElement } from "react";
import type {
  DefaultValues,
  FieldValues,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import { useForm } from "react-hook-form";

type FormProps<T extends FieldValues> = {
  id?: string;
  defaultValues?: DefaultValues<T>;
  validation?: Joi.Schema<T>;
  onSubmit: SubmitHandler<T>;
  children: (methods: UseFormReturn<T>) => React.ReactNode;
};

export default function Form<T extends FieldValues>({
  id,
  defaultValues,
  validation,
  children,
  onSubmit,
  ...rest
}: FormProps<T>) {
  const methods = useForm<T>({
    defaultValues,
    criteriaMode: "all",
    resolver: validation && joiResolver(validation),
  });

  return (
    <form
      id={id}
      noValidate={!!validation}
      onSubmit={methods.handleSubmit(onSubmit)}
      {...rest}
    >
      {children(methods)}
    </form>
  );
}
