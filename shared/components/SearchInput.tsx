"use client";

import Image from "next/image";
import { cn } from "../lib/utils";
import { Input } from "./ui/input";

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
      "background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-xl px-4",
      otherClasses
    )}
  >
    {iconPosition === "left" && (
      <Image src={iconUrl} width={24} height={24} alt="" className="invert-colors cursor-pointer" />
    )}

    <Input
      type="search"
      placeholder={placeholder}
      value=""
      onChange={() => {}}
      className="paragraph-regular no-focus placeholder border-none shadow-none outline-none"
    />

    {iconPosition === "right" && (
      <Image src={iconUrl} width={24} height={24} alt="" className="invert-colors cursor-pointer" />
    )}
  </div>
);