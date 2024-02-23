import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { buildUrlQuery, removeKeysFromQuery } from "../utils";

export function useSearch({ route = "/", queryKey = "q" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get(queryKey) || "");

  const localSearchQuery = searchParams.get("q");

  const updateQueryUrl = (searchQuery: string, localSearchQuery: string | null) => {
    let newUrl = searchParams.toString();

    if (
      (searchQuery === "" && pathname === route && localSearchQuery) ||
      (searchQuery === "" && !localSearchQuery)
    ) {
      newUrl = removeKeysFromQuery({
        params: newUrl,
        keysToRemove: [queryKey],
      });
    } else if (searchQuery !== "") {
      const keysToAdd = [queryKey];
      const valuesToAdd = [searchQuery];

      if (localSearchQuery) {
        keysToAdd.push("page");
        valuesToAdd.push("");
      }

      newUrl = buildUrlQuery({
        params: newUrl,
        keys: keysToAdd,
        values: valuesToAdd,
      });
    }

    router.push(newUrl, { scroll: false });
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      updateQueryUrl(searchQuery, localSearchQuery);
    }, 300);
    return () => clearTimeout(debounce);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchQuery, searchParams]);

  return {
    searchQuery,
    setSearchQuery,
  };
}
