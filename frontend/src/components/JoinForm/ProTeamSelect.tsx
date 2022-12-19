import AutoComplete from "@components/FormControls/AutoComplete";
import type { ProTeam } from "@lib/types";
import type { FieldValues, Path, UseControllerProps } from "react-hook-form";

type ProTeamSelectProps<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  "name"
> & {
  teams: ProTeam[];
};

export default function SchoolSelect<T extends FieldValues>({
  teams,
}: ProTeamSelectProps<T>) {
  const formatTeamTitle = (team: ProTeam) => `${team.name} ${team.mascot}`;

  return (
    <AutoComplete<T, ProTeam>
      id="proTeamSelect"
      name={"team" as Path<T>}
      label="Team Selection"
      size="half"
      options={teams}
      renderOption={formatTeamTitle}
      renderOptionLabel={formatTeamTitle}
      isOptionEqualToValue={(option: ProTeam, value: ProTeam) =>
        option.name === value.name
      }
    />
  );
}
