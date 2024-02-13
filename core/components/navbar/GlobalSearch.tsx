"use client";

import { Input } from "@/shared/components/ui/input";
import Image from "next/image";

const GlobalSearch = () => {
  return (
    <div className="relative w-full max-lg:hidden lg:max-w-[400px] xl:max-w-[600px]">
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image
          src="/assets/icons/search.svg"
          width={24}
          height={24}
          alt="search icon"
          className="cursor-pointer"
        />

        <Input
          type="search"
          placeholder="Search"
          value=""
          onChange={() => {}}
          className="paragraph-regular no-focus placeholder border-none shadow-none outline-none"
        />
      </div>
    </div>
  );
};

export default GlobalSearch;
