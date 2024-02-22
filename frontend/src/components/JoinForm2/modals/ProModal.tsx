import { LEAGUE } from "@lib/constants";
import type { ProForm } from "../lib";
import BaseModal from "./BaseModal";
import type { ProTeam } from "@lib/types";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import {
  ACTION_TYPES,
  ModalContext,
  ModalDispatchContext,
} from "../contexts/ModalContext";

type ProModalProps = {
  availableTeams: ProTeam[];
};

export default function ProModal({ availableTeams }: ProModalProps) {
  const { control, handleSubmit } = useForm<ProForm>();
  const { open, mode, selectedTeam: team } = useContext(ModalContext);

  const dispatch = useContext(ModalDispatchContext);

  const onSubmit = (data: ProForm) => console.log(data);

  if (!dispatch) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BaseModal
        close={() => dispatch({ type: ACTION_TYPES.close })}
        isOpen={open}
        htmlSection="siba"
        member="general manager"
        type={LEAGUE.pro}
        mode={mode}
      ></BaseModal>
    </form>
  );
}
