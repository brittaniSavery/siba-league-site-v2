import * as _ from "radashi";
import useDataFromApi from "@layouts/hooks/useDataFromApi";
import { COLLEGE_LEAGUE_INFO, LEAGUE, PRO_LEAGUE_INFO } from "@lib/constants";
import type { HumanTeam } from "@lib/types";
import { useState } from "react";
import { formatRelative } from "date-fns";

type HumanTeamFileTimesProps = {
  league: LEAGUE;
  teams: HumanTeam[];
};

type TeamFileTime = {
  teamID: number;
  fileType: string;
  latestUpload: Date;
};

export default function HumanTeamFileTimes({
  league,
  teams,
}: HumanTeamFileTimesProps) {
  const leagueInfo =
    league === LEAGUE.pro ? PRO_LEAGUE_INFO : COLLEGE_LEAGUE_INFO;

  const { isLoading, data } = useDataFromApi<{ members: TeamFileTime[] }>(
    `${import.meta.env.PUBLIC_FILE_TIMES_URL}?league=${league}&file=members`
  );

  if (isLoading)
    return (
      <progress className="progress is-small is-primary" max="100">
        Loading...
      </progress>
    );

  const fileTimesByTeamID = _.group(data.members, (m) => m.teamID);

  return (
    <table className="table is-striped">
      <thead>
        <tr>
          <th>Team</th>
          <th>{leagueInfo.pageTitle}</th>
          <th>Latest Uploads</th>
        </tr>
      </thead>
      <tbody>
        {teams.map((t) => (
          <tr key={t.team}>
            <td>{t.team}</td>
            <td>{t.member}</td>
            <td>
              <FileTimeDisplay fileTimes={fileTimesByTeamID[t.id]} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function FileTimeDisplay({ fileTimes }: { fileTimes: TeamFileTime[] }) {
  const [selected, setSelected] = useState<TeamFileTime>(fileTimes[0]);

  return (
    <>
      <div className="select is-fullwidth">
        <select
          onChange={(event) => {
            const newValue = fileTimes.find(
              (u) => u.fileType === event.target.value
            );
            console.log(newValue?.latestUpload);
            if (newValue) setSelected(newValue);
          }}
        >
          {fileTimes.map(({ fileType }) => (
            <option key={fileType} value={fileType}>
              {`.${fileType}`}
            </option>
          ))}
        </select>
      </div>
      <p className="box">
        {formatRelative(new Date(selected.latestUpload), new Date())}
      </p>
    </>
  );
}
