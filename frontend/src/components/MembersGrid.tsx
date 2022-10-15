import { LEAGUE } from "src/content/constants";
import { Member } from "@lib/global";
import { useEffect, useState } from "react";

type MembersGridProps = {
  league: LEAGUE;
};

export default function MembersGrid({ league }: MembersGridProps) {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    fetch(
      `${import.meta.env.PUBLIC_CMS_URL}/${
        league === LEAGUE.pro ? "general-managers" : "coaches"
      }?_sort=team`
    )
      .then((response) => response.json())
      .then((teams) => setMembers(teams));
  }, [league]);

  return (
    <div className="columns is-multiline owners-grid">
      {members.map((m) => (
        <div
          key={m.team}
          className="column is-one-quarter-desktop is-half-tablet"
        >
          <img
            src={`${import.meta.env.SITE}files/${league}/Website/images/${
              m.logo
            }`}
            alt={`${m.team} logo`}
          />
          <h2 className="is-size-5 has-text-weight-semibold">{m.team}</h2>
          <p>{`${league === LEAGUE.pro ? "Owner:" : "Head Coach:"} ${
            m.name
          }`}</p>
        </div>
      ))}
    </div>
  );
}
