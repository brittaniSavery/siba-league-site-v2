import { LEAGUE } from "@content/constants";
import { useEffect, useState } from "react";
import { format, secondsToMilliseconds } from "date-fns";
import { getDataFromApi } from "@lib/utils";

type DownloadFileTimeProps = {
  league: LEAGUE;
  file: string;
};

type FileTimes = {
  league: number;
  graphics: number;
};

export default function DownloadFileTime({
  league,
  file,
}: DownloadFileTimeProps): string {
  const [fileTimes, setFileTimes] = useState<FileTimes>(null);

  useEffect(() => {
    getDataFromApi<FileTimes>(
      `${import.meta.env.PUBLIC_FILE_TIMES_URL}?league=${league}`
    ).then((times) => setFileTimes(times));
  }, [league]);

  if (fileTimes !== null) {
    const milliseconds = secondsToMilliseconds(fileTimes[file]);
    const fileTime = new Date(milliseconds);

    const formattedTime = format(
      new Date(fileTime),
      "MMM dd, yyyy 'at' hh:mm aa"
    );

    return formattedTime;
  }

  return "";
}
