import type { CollegeForm } from "../lib";
import BaseModal from "./BaseModal";

type CollegeModalProps = {
  mode: "add" | "edit";
  selectedTeam?: CollegeForm;
  isOpen: boolean;
  close: () => void;
};

export default function CollegeModal({
  isOpen,
  close,
  mode,
}: CollegeModalProps) {
  return (
    <BaseModal
      close={close}
      isOpen={isOpen}
      htmlSection="college"
      member="head coach"
      type="college"
      mode={mode}
    ></BaseModal>
  );
}
