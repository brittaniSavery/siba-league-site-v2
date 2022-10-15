import { Member, School } from "@lib/global";
import clsx from "clsx";
import { useEffect, useState } from "react";

type TierRankingProps = {
  schools: School[];
  coaches: Member[];
};

export default function TierRanking({ schools, coaches }: TierRankingProps) {
  const [tier, setTier] = useState<number>(1);
  const [tierSchools, setTierSchools] = useState<School[]>([]);

  useEffect(() => {
    const selectedSchools = schools
      .filter((school) => school.tier === tier)
      .sort((a, b) => a.ranking - b.ranking);
    setTierSchools(selectedSchools);
  }, [tier]);

  return (
    <>
      <div className="tabs is-boxed">
        <ul>
          {[1, 2, 3].map((num) => (
            <li
              key={`tier-${num}`}
              className={clsx(num === tier && "is-active")}
            >
              <a onClick={() => setTier(num)}>Tier {num}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="table-container">
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>#</th>
              <th>School</th>
              <th>Nickname</th>
              <th>Region</th>
              <th>Head Coach</th>
            </tr>
          </thead>
          <tbody>
            {tierSchools.map((school) => {
              const schoolCoach = coaches.find(
                (c) => c.team === `${school.name} ${school.mascot}`
              );
              return (
                <tr
                  key={school.name}
                  className={clsx(
                    schoolCoach && "has-background-primary-light"
                  )}
                >
                  <td>{school.ranking}</td>
                  <td>
                    {school.probation && (
                      <span
                        className="has-tooltip-right"
                        data-tooltip={school.probation}
                      >
                        <i className="fa-solid fa-circle-exclamation has-text-danger-dark" />
                      </span>
                    )}{" "}
                    {school.name}
                  </td>
                  <td>{school.mascot}</td>
                  <td>{school.region}</td>
                  <td>{schoolCoach && schoolCoach.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
