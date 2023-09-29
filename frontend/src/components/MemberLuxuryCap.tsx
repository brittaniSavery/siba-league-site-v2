import type { ProTeam } from "@lib/types";
import FontAwesomeIcon from "./FontAwesomeIcon";

export default function MemberLuxuryCap({ teams }: { teams: ProTeam[] }) {
  return (
    <table className="table is-fullwidth">
      <thead>
        <tr>
          <th>Team</th>
          <th>Cap Status</th>
        </tr>
      </thead>
      <tbody>
        {teams.map((t) => (
          <tr key={t.id}>
            <td>{`${t.name} ${t.mascot}`}</td>
            <td>
              <FontAwesomeIcon
                icon={`fa-solid ${t.luxury_tax < 0 ? "fa-minus" : "fa-plus"}`}
                backText={new Intl.NumberFormat("en-us", {
                  style: "currency",
                  currency: "USD",
                  currencySign: "accounting",
                }).format(t.luxury_tax)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
