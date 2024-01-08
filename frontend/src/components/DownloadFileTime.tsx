import type { LEAGUE } from "@lib/constants";
import { useEffect, useState } from "react";
import { format, secondsToMilliseconds } from "date-fns";
import { getDataFromApi } from "@lib/utils";

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
  const [fileTimes, setFileTimes] = useState<FileTimes>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDataFromApi<FileTimes>(
      `${import.meta.env.PUBLIC_FILE_TIMES_URL}?league=${league}&file=${file}`
    ).then((times) => {
      setLoading(false);
      setFileTimes(times);
    });
  }, [league]);

  if (loading) {
    return "Loading...";
  }

  if (fileTimes && fileTimes[file]) {
    const milliseconds = secondsToMilliseconds(fileTimes[file]);
    const fileTime = new Date(milliseconds);

    const formattedTime = format(
      new Date(fileTime),
      "MMM dd, yyyy 'at' hh:mm aa"
    );

    return formattedTime;
  }

  return "Currently unavailable";
}
