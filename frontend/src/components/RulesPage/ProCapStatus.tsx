import type { ProTeam } from "@lib/types";

type ProCapStatusProps = {
  teams: ProTeam[];
};

export default function ProCapStatus({ teams }: ProCapStatusProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>Team</th>
          <th>Cap Status</th>
        </tr>
      </thead>
      <tbody>
        {teams.map(({ name, mascot, luxury_tax }) => (
          <tr key={name}>
            <td>{`${name} ${mascot}`}</td>
            <td>
              {new Intl.NumberFormat("en-us", {
                style: "currency",
                currency: "USD",
              }).format(luxury_tax)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
