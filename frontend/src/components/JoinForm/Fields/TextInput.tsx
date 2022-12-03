import { capitalize, lowerCase } from "lodash-es";
import type { Path, UseFormRegister } from "react-hook-form";
import type { SchemaType } from "../schema";

type TextInputProps = {
  label: Path<SchemaType>;
  placeHolder?: string;
  register: UseFormRegister<SchemaType>;
};

export default function TextInput({
  label,
  placeHolder,
  register,
}: TextInputProps) {
  return (
    <div className="field">
      <label className="label">{capitalize(label)}</label>
      <div className="control">
        <input
          className="input"
          type="text"
          placeholder={placeHolder ?? ""}
          {...register(label)}
        />
      </div>
      <p className="help is-success">Error will go here!</p>
    </div>
  );
}
