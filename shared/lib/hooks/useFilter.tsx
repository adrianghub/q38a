import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { buildUrlQuery, removeKeysFromQuery } from "../utils";

export function useFilter({ queryKey = "filter", paramsToRemove = [], route }: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [selectedFilter, setSelectedFilter] = useState<string>(searchParams.get(queryKey) || "");

  const updateQueryUrl = (selectedFilter: string) => {
    let newUrl = searchParams.toString();

    if ((selectedFilter === "" && (pathname === route || !route)) || selectedFilter === "all") {
      setSelectedFilter("");

      if (!newUrl.includes(queryKey)) return;

      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: [queryKey, ...paramsToRemove],
      });

      router.push(newUrl, { scroll: false });
    } else {
      newUrl = buildUrlQuery({
        params: searchParams.toString(),
        keys: [queryKey, ...paramsToRemove],
        values: [selectedFilter, ...paramsToRemove.map(() => null)],
      });

      router.push(newUrl, { scroll: false });
    }
  };

  useEffect(() => {
    updateQueryUrl(selectedFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, selectedFilter]);

  return {
    selectedFilter,
    setSelectedFilter,
  };
}
