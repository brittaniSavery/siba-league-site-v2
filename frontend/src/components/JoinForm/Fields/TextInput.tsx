import { capitalize } from "lodash-es";
import type { BasicInput } from "./fieldTypes";

export default function TextInput({
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
        <input
          className="input"
          type="text"
          placeholder={placeHolder ?? ""}
          {...register(name, registerOptions)}
        />
      </div>
      {error && <p className="help is-danger">{error.message}</p>}
    </div>
  );
}
