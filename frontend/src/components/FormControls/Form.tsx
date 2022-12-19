import { joiResolver } from "@hookform/resolvers/joi";
import type Joi from "joi";
import { useEffect } from "react";
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
  isCancelled?: boolean;
  onSubmit: SubmitHandler<T>;
};

export default function Form<T extends FieldValues>({
  id,
  defaultValues,
  validation,
  children,
  isCancelled,
  onSubmit,
  ...rest
}: FormProps<T>) {
  const methods = useForm<T>({
    defaultValues,
    criteriaMode: "all",
    resolver: validation && joiResolver(validation),
  });

  useEffect(() => {
    const isSubmitGood = methods.formState.isSubmitSuccessful;

    if (isSubmitGood || isCancelled) {
      console.log("Calling Reset", {
        isSubmitSuccessful: methods.formState.isSubmitSuccessful,
        isCancelled,
      });
      methods.reset(defaultValues);
    }
  }, [methods.formState.isSubmitSuccessful, isCancelled]);

  return (
    <FormProvider<T> {...methods}>
      <form
        id={id}
        noValidate={!!validation}
        onSubmit={methods.handleSubmit(onSubmit)}
        {...rest}
      >
        {children}
      </form>
    </FormProvider>
  );
}
