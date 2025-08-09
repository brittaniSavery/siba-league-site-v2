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
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await (response.json() as Promise<T>);
}

export function formatTeamTitle(team: ProTeam | School) {
  return `${team.name} ${team.mascot}`;
}

export function mergeArrays<T, K>(
  arr1: T[],
  arr2: K[],
  key: string,
  ignoreUniqueEntries?: boolean
) {
  return arr2.reduce((acc, b) => {
    const idx = acc.findIndex((item) => item[key] === b[key]); //look for the acc has the same id while iterating array2
    if (idx > -1) {
      // if found need to merge with value of array2
      acc[idx] = Object.assign(b, acc[idx]);
      return acc;
    } else if (!ignoreUniqueEntries)
      return [...acc, b]; //if we don't find anything so "b" is an unique entry
    else return acc;
  }, arr1); //inital values of reduce is from array1
}
