import type { LEAGUE } from "@content/constants";
import type { Member, Team } from "@lib/types";
import { getDataFromApi } from "@lib/utils";
import { formatRelative } from "date-fns";
import { useEffect, useState } from "react";

type Upload = {
  fileType: string;
  latestUpload: Date;
};

type ApiResult = {
  members: (Upload & { teamID: string })[];
};

type TeamUploads = {
  id: number;
  uploads: Upload[];
};

type MemberUploadsProps = {
  league: LEAGUE;
  members: Member[];
  teams: Team[];
};

function UploadDisplay({ uploads }: { uploads: Upload[] }) {
  const [selected, setSelected] = useState<Upload>(uploads[0]);

  return (
    <>
      <div className="select is-fullwidth">
        <select
          onChange={(event) => {
            const newValue = uploads.find(
              (u) => u.fileType === event.target.value
            );
            console.log(newValue?.latestUpload);
            if (newValue) setSelected(newValue);
          }}
        >
          {uploads.map(({ fileType }) => (
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

export default function MemberUploads({
  league,
  members,
  teams,
}: MemberUploadsProps) {
  const [teamUploads, setTeamUploads] = useState<TeamUploads[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getDataFromApi<ApiResult>(
      `${import.meta.env.PUBLIC_FILE_TIMES_URL}?league=${league}&file=members`
    ).then((data) => {
      const uploads: TeamUploads[] = [];
      let current = {} as TeamUploads;

      data.members.forEach(({ teamID, fileType, latestUpload }) => {
        const numTeamId = parseInt(teamID);
        if (Object.hasOwn(current, "id") && current.id === numTeamId) {
          current.uploads.push({
            fileType,
            latestUpload,
          });
        } else {
          current = {
            id: numTeamId,
            uploads: [
              {
                fileType,
                latestUpload,
              },
            ],
          };
          uploads.push(current);
        }
      });

      uploads.push(current);

      setTeamUploads(uploads);
      setLoading(false);
    });
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <table className="table" style={{ tableLayout: "fixed" }}>
      <thead>
        <tr>
          <th>Team</th>
          <th>Coach</th>
          <th>Latest Uploads</th>
        </tr>
      </thead>
      <tbody>
        {members.map(({ team, name }) => {
          const id = teams.find((t) => `${t.name} ${t.mascot}` === team)?.id;
          const currentUploads = teamUploads.find((u) => u.id === id);
          return (
            <tr key={team}>
              <td>{team}</td>
              <td>{name}</td>
              <td>
                {currentUploads && (
                  <UploadDisplay
                    key={`${team} (${id})`}
                    uploads={currentUploads.uploads}
                  />
                )}
                {!currentUploads && (
                  <div className="icon-text">
                    <span className="icon has-text-danger">
                      <i className="fas fa-ban" />
                    </span>
                    <span>No Exports Found!</span>
                  </div>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
