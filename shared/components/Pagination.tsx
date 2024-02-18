"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { buildUrlQuery, removeKeysFromQuery } from "../lib/utils";
import { Button } from "../ui/button";

const Pagination = ({
  pageNumber = 1,
  hasNext = false,
}: {
  pageNumber?: number;
  hasNext?: boolean;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pageNumber === 1) {
      const newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["page"],
      });

      router.push(newUrl, { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  const handleNavigation = (direction: "prev" | "next") => {
    const nextPageNumber = direction === "prev" ? pageNumber - 1 : pageNumber + 1;

    const newUrl = buildUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNumber.toString(),
    });

    router.push(newUrl);
  };

  return (
    <div className="flex items-center gap-3">
      <Button
        disabled={pageNumber === 1}
        onClick={() => handleNavigation("prev")}
        className="light-border-2 flex min-h-[36px] items-center justify-center gap-2 border"
      >
        Prev
      </Button>
      <div className="flex items-center justify-center rounded-t-md px-3.5 py-2">
        <p className="body-semibold text-primary-500">{pageNumber}</p>
      </div>
      <Button
        disabled={!hasNext}
        onClick={() => handleNavigation("next")}
        className="light-border-2 flex min-h-[36px] items-center justify-center gap-2 border"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
