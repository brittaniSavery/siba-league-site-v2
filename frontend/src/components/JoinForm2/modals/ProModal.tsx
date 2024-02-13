import type { ProForm } from "../lib";
import BaseModal from "./BaseModal";

type ProModalProps = {
  mode: "add" | "edit";
  selectedTeam?: ProForm;
  isOpen: boolean;
  close: () => void;
};

export default function ProModal({ isOpen, close, mode }: ProModalProps) {
  return (
    <BaseModal
      close={close}
      isOpen={isOpen}
      htmlSection="siba"
      member="general manager"
      type="pro"
      mode={mode}
    ></BaseModal>
  );
}
