import type { Member, School } from "@lib/types";
import clsx from "clsx";
import { useEffect, useState } from "react";

type TierRankingsProps = {
  coaches: Member[];
  schools: School[];
};

export default function TierRankings({ coaches, schools }: TierRankingsProps) {
  const rankingSorted = schools.sort((a, b) => a.ranking - b.ranking);
  const tier1 = rankingSorted.filter((school) => school.tier === 1);
  const tier2 = rankingSorted.filter((school) => school.tier === 2);
  const tier3 = rankingSorted.filter((school) => school.tier === 3);

  const [activeTab, setActiveTab] = useState(1);
  const [currentSchools, setCurrentSchools] = useState(tier1);

  useEffect(() => {
    switch (activeTab) {
      case 1:
        setCurrentSchools(tier1);
        break;
      case 2:
        setCurrentSchools(tier2);
        break;
      case 3:
        setCurrentSchools(tier3);
        break;
    }
  }, [activeTab]);

  return (
    <>
      <div className="tabs is-boxed mb-2">
        <ul>
          <li className={clsx(activeTab === 1 && "is-active")}>
            <a onClick={() => setActiveTab(1)}>Tier 1</a>
          </li>
          <li className={clsx(activeTab === 2 && "is-active")}>
            <a onClick={() => setActiveTab(2)}>Tier 2</a>
          </li>
          <li className={clsx(activeTab === 3 && "is-active")}>
            <a onClick={() => setActiveTab(3)}>Tier 3</a>
          </li>
        </ul>
      </div>
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>#</th>
            <th>School</th>
            <th>Mascot</th>
            <th>Region</th>
            <th>Head Coach</th>
          </tr>
        </thead>
        <tbody>
          {currentSchools.map(
            ({ name, mascot, ranking, probation, region }) => {
              const humanCoach = coaches.find(
                (coach) => coach.team === `${name} ${mascot}`
              );
              return (
                <tr key={ranking} className={clsx(humanCoach && "highlighted")}>
                  <td>{ranking}</td>
                  <td>{name}</td>
                  <td>{mascot}</td>
                  <td>{region}</td>
                  <td>{humanCoach && humanCoach.name}</td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </>
  );
}
