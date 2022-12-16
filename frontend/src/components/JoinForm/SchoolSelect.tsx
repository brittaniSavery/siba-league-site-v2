import AutoComplete from "@components/FormControls/AutoComplete";
import type { School } from "@lib/types";
import type { FieldValues, Path, UseControllerProps } from "react-hook-form";

type SchoolSelectProps<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  "name"
> & {
  schools: School[];
};

export default function SchoolSelect<T extends FieldValues>({
  schools,
}: SchoolSelectProps<T>) {
  const formatSchoolTitle = (school: School) =>
    `${school.name} ${school.mascot}`;

  return (
    <AutoComplete<T, School>
      id="schoolSelect"
      name={"teamSelect" as Path<T>}
      label="Team Selection"
      size="half"
      options={schools}
      renderOption={formatSchoolTitle}
      renderOptionLabel={formatSchoolTitle}
    />
  );
}
