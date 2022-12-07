import { joiResolver } from "@hookform/resolvers/joi";
import type Joi from "joi";
import { useEffect } from "react";
import type {
  DefaultValues,
  FieldValues,
  SubmitHandler,
} from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";

type FormProps<T extends FieldValues> = React.PropsWithChildren &
  React.HTMLAttributes<HTMLFormElement> & {
    defaultValues?: DefaultValues<T>;
    validation?: Joi.Schema<T>;
    onSubmit: SubmitHandler<T>;
  };

export default function Form<T extends FieldValues>({
  defaultValues,
  validation,
  children,
  onSubmit,
  ...rest
}: FormProps<T>) {
  const methods = useForm<T>({
    defaultValues,
    resolver: validation && joiResolver(validation),
  });

  useEffect(() => {
    console.log(methods.getValues());
    console.log(methods.formState.errors);
  }, [methods.formState]);

  return (
    <FormProvider {...methods}>
      <form
        noValidate={!!validation}
        onSubmit={methods.handleSubmit(onSubmit)}
        {...rest}
      >
        {children}
      </form>
    </FormProvider>
  );
}
