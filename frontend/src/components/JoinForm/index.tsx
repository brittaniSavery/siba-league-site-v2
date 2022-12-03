import TextInput from "@components/JoinForm/Fields/TextInput";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Member, ProTeam, School } from "@lib/types";
import { useForm } from "react-hook-form";
import { schema, SchemaType } from "./schema";

type JoinFormProps = {
  schools: School[];
  coaches: Member[];
  proTeams: ProTeam[];
  gms: Member[];
};

export default function JoinForm() {
  const { register, handleSubmit } = useForm<SchemaType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: SchemaType) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput label="name" register={register} />
      <button type="submit" className="button is-primary">
        Join
      </button>
    </form>
  );
}
