import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { buildUrlQuery, removeKeysFromQuery } from "../utils";

export function useSearch({ route = "/" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get("q") || "");

  useEffect(() => {
    const newUrl = removeKeysFromQuery({
      params: searchParams.toString(),
      keysToRemove: ["page"],
    });

    router.push(newUrl, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      // remove page from query if search query is not empty

      if (searchQuery === "" && pathname === route) {
        const newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["q"],
        });

        router.push(newUrl, { scroll: false });
      }

      if (searchQuery !== "") {
        let newUrl = searchParams.toString();

        newUrl = buildUrlQuery({
          params: newUrl.toString(),
          key: "q",
          value: searchQuery,
        });

        router.push(newUrl, { scroll: false });
      }
    }, 300);
    return () => clearTimeout(debounce);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchQuery, searchParams]);

  return {
    searchQuery,
    setSearchQuery,
  };
}
