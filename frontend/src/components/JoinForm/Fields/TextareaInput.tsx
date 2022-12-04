import { capitalize } from "lodash-es";
import type { BasicInput } from "./fieldTypes";

export default function TextareaInput({
  name,
  label,
  placeHolder,
  error,
  register,
  registerOptions,
}: BasicInput) {
  return (
    <div className="field">
      <label className="label">{label ?? capitalize(name)}</label>
      <div className="control">
        <textarea
          className="textarea"
          placeholder={placeHolder ?? ""}
          {...register(name, registerOptions)}
        />
      </div>
      {error && <p className="help is-danger">{error.message}</p>}
    </div>
  );
}
