"use client";

import Image from "next/image";
import { Input } from "../ui/input";

export const GlobalSearchInput = () => {
  return (
    <div className="relative w-full max-lg:hidden lg:max-w-[400px] xl:max-w-[600px]">
      <div className=" background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4 focus-within:ring-2 focus:ring-2">
        <Image
          src="/assets/icons/search.svg"
          width={24}
          height={24}
          alt="search icon"
          className="cursor-pointer dark:invert"
        />

        <Input
          type="search"
          placeholder="Search anything"
          value=""
          onChange={() => {}}
          className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none"
        />
      </div>
    </div>
  );
};
