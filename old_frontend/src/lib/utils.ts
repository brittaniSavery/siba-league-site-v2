import { Article, Tag } from "./global";
import { capitalize, sortBy } from "lodash-es";

export function getFormattedDate(date: string | Date): string {
  const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let dateObj: Date;
  if (typeof date === "string") {
    dateObj = new Date(date);
  } else dateObj = date;

  return `${MONTHS[dateObj.getMonth()]}
   ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
}

export function linkify(data: string, original = false): string {
  const formatted = data.replace(/\s/g, "_");
  return original ? formatted : formatted.toLowerCase();
}

export async function getDataFromApi<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await (response.json() as Promise<T>);
}

export function generateArticleTags(article: Article): Tag[] {
  const { league, tags } = article;
  const sortedTags = sortBy([...tags, { name: capitalize(league) }], ["name"]);
  return sortedTags;
}
