import { joiResolver } from "@hookform/resolvers/joi";
import type Joi from "joi";
import { useEffect, createElement } from "react";
import type {
  DefaultValues,
  FieldValues,
  SubmitHandler,
} from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";

type FormProps<T extends FieldValues> = React.PropsWithChildren & {
  id?: string;
  defaultValues?: DefaultValues<T>;
  validation?: Joi.Schema<T>;
  onSubmit: SubmitHandler<T>;
};

export default function Form<T extends FieldValues>({
  id,
  defaultValues,
  validation,
  children,
  onSubmit,
  ...rest
}: FormProps<T>) {
  const { handleSubmit, register } = useForm<T>({
    defaultValues,
    criteriaMode: "all",
    resolver: validation && joiResolver(validation),
  });

  return (
    <form
      id={id}
      noValidate={!!validation}
      onSubmit={handleSubmit(onSubmit)}
      {...rest}
    >
      {Array.isArray(children)
        ? children.map((child) => {
            return child.props.name && !child.props.control
              ? createElement(child.type, {
                  ...{
                    ...child.props,
                    register,
                    key: child.props.name,
                  },
                })
              : child;
          })
        : children}
    </form>
  );
}
