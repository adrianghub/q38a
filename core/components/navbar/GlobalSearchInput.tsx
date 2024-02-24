"use client";

import { useSearch } from "@/shared/lib/hooks/useSearch";
import { Input } from "@/shared/ui/input";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import GlobalSearchPopover from "./GlobalSearchPopover";

export const GlobalSearchInput = () => {
  const { searchQuery, setSearchQuery } = useSearch({ queryKey: "global" });
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchInputRef.current && searchInputRef.current.contains(e.target as Node)) return;

      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClick);

    setIsOpen(false);

    return () => document.removeEventListener("click", handleClick);
  }, [popoverRef]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);

    if (!isOpen) setIsOpen(true);

    if (e.target.value === "" && isOpen) setIsOpen(false);
  };

  return (
    <div className="relative w-full max-lg:hidden lg:max-w-[400px] xl:max-w-[600px]">
      <div className=" background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4 focus-within:ring-2 focus:ring-2">
        <Image
          src="/assets/icons/search.svg"
          width={24}
          height={24}
          alt="search icon"
          onClick={() => searchInputRef.current?.focus()}
          className="cursor-pointer dark:invert"
        />

        <Input
          ref={searchInputRef}
          type="search"
          placeholder="Search anything"
          value={searchQuery}
          onChange={(e) => handleSearch(e)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
          onClick={() => searchInputRef.current?.focus()}
          className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none"
        />
      </div>
      {isOpen && <GlobalSearchPopover ref={popoverRef} />}
    </div>
  );
};
