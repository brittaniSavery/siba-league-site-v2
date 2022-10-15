import { useForm, SubmitHandler } from "react-hook-form";
import Input from "./Input";

type JoinFormProps = {
  name: string;
  email: string;
  foundBy: "developers" | "referral" | "google" | "fb" | "twitter" | "other";
  reason?: string;
};

const onSubmit: SubmitHandler<JoinFormProps> = (data) => console.log(data);

export default function JoinForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<JoinFormProps>();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        name="name"
        label="Name"
        type="text"
        errors={errors}
        {...register("name", {
          required: "Please enter your name",
        })}
      />
      <Input
        name="email"
        label="Email"
        type="text"
        errors={errors}
        {...register("email", {
          required: "Please enter your email",
          pattern: {
            value:
              // eslint-disable-next-line no-control-regex
              /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
            message: "Please enter a valid email",
          },
        })}
      />
      <div className="control">
        <button type="submit" className="button is-primary">
          Submit
        </button>
      </div>
    </form>
  );
}
