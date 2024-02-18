"use client";

import { Input } from "@/shared/ui/input";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { buildUrlQuery, cn, removeKeysFromQuery } from "../lib/utils";

type SearchProps = {
  route?: string;
  iconPosition?: "left" | "right";
  iconUrl?: string;
  otherClasses?: string;
  placeholder: string;
};

export const SearchInput = ({
  placeholder,
  route = "/",
  iconPosition = "left",
  iconUrl = "/assets/icons/search.svg",
  otherClasses,
}: SearchProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get("q") || "");

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchQuery === "" && pathname === route) {
        const newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["q"],
        });

        router.push(newUrl, { scroll: false });
      }

      if (searchQuery !== "") {
        const newUrl = buildUrlQuery({
          params: searchParams.toString(),
          key: "q",
          value: searchQuery,
        });

        router.push(newUrl, { scroll: false });
      }
    }, 500);
    return () => clearTimeout(debounce);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchQuery]);

  return (
    <div
      className={cn(
        "background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4 focus-within:ring-2 focus:ring-2",
        otherClasses
      )}
    >
      {iconPosition === "left" && (
        <Image src={iconUrl} width={24} height={24} alt="" className="cursor-pointer dark:invert" />
      )}

      <Input
        type="search"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none"
      />

      {iconPosition === "right" && (
        <Image src={iconUrl} width={24} height={24} alt="" className="cursor-pointer dark:invert" />
      )}
    </div>
  );
};
