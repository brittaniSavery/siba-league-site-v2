import type { Member, School, StrapiObject } from "@lib/types";
import clsx from "clsx";
import { useEffect, useState } from "react";

type TierRankingsProps = {
  coaches: StrapiObject<Member>[];
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
      <div className="tabs mb-2">
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
          <th>#</th>
          <th>School</th>
          <th>Mascot</th>
          <th>Region</th>
          <th>Head Coach</th>
        </thead>
        <tbody>
          {currentSchools.map((school) => {
            const humanCoach = coaches.find(
              (coach) =>
                coach.attributes.team === `${school.name} ${school.mascot}`
            );
            return (
              <tr
                key={school.name}
                className={clsx(humanCoach && "highlighted")}
              >
                <td>{school.ranking}</td>
                <td>
                  <span className="icon-text">
                    {school.probation && (
                      <span
                        className="icon has-tooltip-arrow"
                        data-tooltip={school.probation}
                      >
                        <i className="fa-solid fa-circle-exclamation has-text-danger-dark" />
                      </span>
                    )}
                    {school.name}
                  </span>
                </td>
                <td>{school.mascot}</td>
                <td>{school.region}</td>
                <td>{humanCoach && humanCoach.attributes.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
