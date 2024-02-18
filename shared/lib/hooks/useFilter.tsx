import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { buildUrlQuery, removeKeysFromQuery } from "../utils";

export function useFilter({ route = "/" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [selectedFilter, setSelectedFilter] = useState<string>(searchParams.get("filter") || "");

  useEffect(() => {
    if ((selectedFilter === "" && pathname === route) || selectedFilter === "all") {
      setSelectedFilter("");

      const newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["filter"],
      });

      router.push(newUrl, { scroll: false });
    }

    if (selectedFilter !== "") {
      const newUrl = buildUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: selectedFilter,
      });

      router.push(newUrl, { scroll: false });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route, selectedFilter]);

  useEffect(() => {
    if (searchParams.get("filter") !== selectedFilter) {
      setSelectedFilter(searchParams.get("filter") || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return {
    selectedFilter,
    setSelectedFilter,
  };
}