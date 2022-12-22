import { COLLEGE_LEAGUE_INFO, LEAGUE } from "@content/constants";
import Form from "@components/FormControls/Form";
import ProbationIcon from "@components/ProbationIcon";
import ModalSkeleton from "./ModalSkeleton";
import TeamModalForm from "./TeamModalForm";
import type { School } from "@lib/types";
import type { SubmitHandler } from "react-hook-form";
import type { FormCollegeTeam } from "./schema";

type SchoolModalProps = {
  isOpen: boolean;
  close: () => void;
  defaultValues?: FormCollegeTeam;
  options: School[];
};
export default function SchoolModal({
  isOpen,
  close,
  options,
}: SchoolModalProps) {
  // const validation = schoolValidationSchema

  const onSubmit: SubmitHandler<FormCollegeTeam> = (data) => {
    console.log(data);
  };

  return (
    <Form<FormCollegeTeam>
      onSubmit={onSubmit}
      // validation={validation}
    >
      {() => (
        <ModalSkeleton
          type={LEAGUE.college}
          member={COLLEGE_LEAGUE_INFO.singleMember}
          htmlSection="college"
          isOpen={isOpen}
          close={close}
          extraInfo={
            <p>
              Teams that have an exclamation icon (
              <ProbationIcon iconOnly />) are on probation.
            </p>
          }
        >
          {/* TODO */}
        </ModalSkeleton>
      )}
    </Form>
  );
}
