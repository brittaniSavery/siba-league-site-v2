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
      name={"team" as Path<T>}
      label="Team Selection"
      size="half"
      options={schools}
      renderOption={(school: School) => (
        <>
          <p>{formatSchoolTitle(school)}</p>
          <p>
            Tier {school.tier} | Region: {school.region}
          </p>
        </>
      )}
      renderOptionLabel={formatSchoolTitle}
      isOptionEqualToValue={(option: School, value: School) =>
        option.name === value.name
      }
    />
  );
}
