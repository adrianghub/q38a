"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { useFilter } from "../lib/hooks/useFilter";
import { cn } from "../lib/utils";
import { Option } from "../types/filters";

type SelectInputProps = {
  options: Option[];
  placeholder: string;
  containerClasses?: string;
  otherClasses?: string;
  route?: string;
};

export const SelectFilterInput = ({
  options,
  placeholder,
  containerClasses,
  otherClasses,
  route = "/",
}: SelectInputProps) => {
  const { selectedFilter, setSelectedFilter } = useFilter({ route, paramsToRemove: ["page"] });

  return (
    <div className={cn("relative", containerClasses)}>
      <Select onValueChange={(value) => setSelectedFilter(value)} value={selectedFilter}>
        <SelectTrigger
          className={cn(
            "body-regular border-light-800 dark:border-dark-300 background-light800_dark300 text-dark500_light700 px-5 py-2.5",
            otherClasses
          )}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder={placeholder} />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={String(option.value)}>
                {option.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
