import Form from "@components/FormControls/Form";
import { LEAGUE, PRO_LEAGUE_INFO } from "@content/constants";
import type { ProTeam } from "@lib/types";
import type { SubmitHandler } from "react-hook-form";
import ModalSkeleton from "./ModalSkeleton";
import type { FormProTeam } from "./schema";

type SchoolModalProps = {
  isOpen: boolean;
  close: () => void;
  defaultValues?: FormProTeam;
  options: ProTeam[];
};
export default function SchoolModal({
  isOpen,
  close,
  options,
}: SchoolModalProps) {
  // const validation = schoolValidationSchema

  const onSubmit: SubmitHandler<FormProTeam> = (data) => {
    console.log(data);
  };

  return (
    <Form<FormProTeam>
      onSubmit={onSubmit}
      // validation={validation}
    >
      {() => (
        <ModalSkeleton
          type={LEAGUE.pro}
          member={PRO_LEAGUE_INFO.singleMember}
          htmlSection="siba"
          isOpen={isOpen}
          close={close}
        >
          {/* TODO */}
        </ModalSkeleton>
      )}
    </Form>
  );
}
