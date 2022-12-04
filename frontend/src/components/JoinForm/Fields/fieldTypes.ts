import type {
  FieldError,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import type { JoinSchema } from "../schema";

export type BasicInput = {
  name: Path<JoinSchema>;
  label?: string;
  placeHolder?: string;
  error?: FieldError;
  register: UseFormRegister<JoinSchema>;
  registerOptions?: RegisterOptions;
};
