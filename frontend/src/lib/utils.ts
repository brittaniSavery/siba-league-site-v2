import { format } from "date-fns";
import type { ProTeam, School } from "./types";

export function getFormattedDate(date: string | Date): string {
  let dateObj: Date;
  if (typeof date === "string") {
    dateObj = new Date(date);
  } else dateObj = date;

  return format(dateObj, "MMM d, yyyy");
}

export function linkify(data: string): string {
  const formatted = data.replace(/\s/g, "_");
  return formatted;
}

export async function getDataFromApi<T>(url: string): Promise<T> {
  console.log("Url: ", url);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await (response.json() as Promise<T>);
}

export function formatTeamTitle(team: ProTeam | School) {
  return `${team.name} ${team.mascot}`;
}
