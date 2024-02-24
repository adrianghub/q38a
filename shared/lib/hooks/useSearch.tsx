import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { buildUrlQuery, removeKeysFromQuery } from "../utils";

export function useSearch({ queryKey = "q", paramsToRemove = [], route }: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get(queryKey) || "");

  const updateQueryUrl = (searchQuery: string) => {
    let newUrl = searchParams.toString();

    if (searchQuery === "" && (pathname === route || !route)) {
      if (!newUrl.includes(queryKey)) return;

      newUrl = removeKeysFromQuery({
        params: newUrl,
        keysToRemove: [queryKey, ...paramsToRemove],
      });

      router.push(newUrl, { scroll: false });
    } else {
      newUrl = buildUrlQuery({
        params: newUrl.toString(),
        keys: [queryKey, ...paramsToRemove],
        values: [searchQuery, ...paramsToRemove.map(() => null)],
      });

      router.push(newUrl, { scroll: false });
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      updateQueryUrl(searchQuery);
    }, 300);
    return () => clearTimeout(debounce);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
  };
}
