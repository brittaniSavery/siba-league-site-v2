import useDataFromApi from "@hooks/useDataFromApi";
import type { LEAGUE } from "@lib/constants";
import { format, secondsToMilliseconds } from "date-fns";

type DownloadFileTimeProps = {
  league: LEAGUE;
  file: "main" | "graphics";
};

type FileTimes = {
  [k: string]: number;
};

export default function DownloadFileTime({
  league,
  file,
}: DownloadFileTimeProps): string {
  const { isLoading, data } = useDataFromApi<FileTimes>(
    `${import.meta.env.PUBLIC_FILE_TIMES_URL}?league=${league}&file=${file}`,
  );

  if (isLoading) {
    return "Loading...";
  }

  if (data && data[file]) {
    const milliseconds = secondsToMilliseconds(data[file]);
    const fileTime = new Date(milliseconds);

    const formattedTime = format(
      new Date(fileTime),
      "MMM dd, yyyy 'at' hh:mm aa",
    );

    return formattedTime || "Currently unavailable";
  }

  return "Currently unavailable";
}
