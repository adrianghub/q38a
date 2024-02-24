"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { forwardRef, useEffect, useState } from "react";
import { GlobalSearchFilters } from "./GlobalSearchFilters";

interface SearchResultItem {
  id: number;
  type: string;
  name: string;
}

// eslint-disable-next-line react/display-name
const GlobalSearchPopover = forwardRef<HTMLDivElement | null>((_, ref) => {
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([
    {
      id: 1,
      type: "type",
      name: "name",
    },
    {
      id: 2,
      type: "type",
      name: "name",
    },
    {
      id: 3,
      type: "type",
      name: "name",
    },
  ]);

  const global = searchParams.get("global");
  const type = searchParams.get("type");

  useEffect(() => {
    // const fetchResult = async () => {
    //   setSearchResults([]);
    //   setIsLoading(true);
    // };

    try {
      // search
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [global, type]);

  const renderLink = (type: string, id: string) => {
    return "/";
  };

  return (
    <div className="absolute top-full z-10 mt-3 w-full rounded-xl bg-light-800 py-5 shadow-sm dark:bg-dark-400">
      <GlobalSearchFilters ref={ref} />
      <div className="my-5 h-[1px] bg-light-700/50 dark:bg-dark-500/50 " />
      <div className="space-y-5">
        <p className="text-dark400_light900 paragraph-semibold px-5">Top Match</p>

        {isLoading ? (
          <div className="flex-center flex-col px-5">
            <Image
              src="/assets/icons/reload.svg"
              width={10}
              height={10}
              alt="loading"
              className="my-2 animate-spin text-primary-500 "
            />
            <p className="text-dark200_light800 body-regular">Browsing the entire universe...</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {searchResults.length > 0 ? (
              searchResults.map((item: SearchResultItem, idx: number) => (
                <Link
                  key={item.type + item.id + idx}
                  href={renderLink("type", "id")}
                  className="flex w-full cursor-pointer items-start gap-3 px-5 py-2.5 hover:bg-light-700/50 hover:dark:bg-dark-500/50"
                >
                  <Image
                    src="/assets/icons/tag.svg"
                    width={18}
                    height={18}
                    alt="tag icon"
                    className="mt-1 object-contain dark:invert"
                  />

                  <div className="flex flex-col">
                    <p className="text-dark200_light800 body-medium line-clamp-1">{item.name}</p>
                    <p className="text-dark400_light500 small-medium mt-1 font-bold capitalize">
                      {item.type}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex-center flex-col px-5">
                <Image src="/assets/icons/empty.svg" width={20} height={20} alt="empty" />
                <p className="text-dark200_light800 body-regular px-5 py-2.5">No matches found.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

export default GlobalSearchPopover;
