import { format } from "date-fns";

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

// export function generateArticleTags(article: Article): Tag[] {
//   const { league, tags } = article;
//   const sortedTags = sortBy([...tags, { name: capitalize(league) }], ["name"]);
//   return sortedTags;
// }
