"use client";

import { Input } from "@/core/components/ui/input";
import Image from "next/image";
import { cn } from "../lib/utils";

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
}: SearchProps) => (
  <div
    className={cn(
      "background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4 focus-within:ring-2 focus:ring-2",
      otherClasses
    )}
  >
    {iconPosition === "left" && (
      <Image src={iconUrl} width={24} height={24} alt="" className="cursor-pointer" />
    )}

    <Input
      type="search"
      placeholder={placeholder}
      value=""
      onChange={() => {}}
      className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none"
    />

    {iconPosition === "right" && (
      <Image src={iconUrl} width={24} height={24} alt="" className="invert-colors cursor-pointer" />
    )}
  </div>
);
