import { useEffect, useState } from "react";

export default function useDataFromApi<T>(url: string) {
  const [data, setData] = useState<T>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      fetch(url)
        .then((response) => response.json() as Promise<T>)
        .then((times) => {
          setLoading(false);
          if (times) setData(times);
        });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, []);

  return { isLoading: loading, data };
}
