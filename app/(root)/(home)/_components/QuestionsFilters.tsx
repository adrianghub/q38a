"use client";

import { SelectFilterInput } from "@/shared/components/SelectFilterInput";
import { HomePageFilters } from "@/shared/constants/filters";
import { useFilter } from "@/shared/lib/hooks/useFilter";
import { cn } from "@/shared/lib/utils";
import { Option } from "@/shared/types/filters";
import { Button } from "@/shared/ui/button";
import React from "react";

type QuestionsFiltersParams = {
  children: React.ReactNode;
  route?: string;
};

const filters: Option[] = HomePageFilters;

export const QuestionsFilters = ({ children, route = "/" }: QuestionsFiltersParams) => {
  const { selectedFilter, setSelectedFilter } = useFilter({ route });

  const selectFilter = (filter: Option) => {
    const foundFilter = filters.find((f) => f.value === filter.value);

    if (foundFilter?.value === selectedFilter) {
      setSelectedFilter("");
      return;
    }

    if (foundFilter) {
      setSelectedFilter(foundFilter.value as string);
    }
  };

  return (
    <>
      <div className="flex justify-between gap-5 max-sm:flex-col sm:items-center">
        {children}

        <SelectFilterInput
          options={filters}
          placeholder="Select filter"
          containerClasses="hidden max-md:flex"
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <div className="hidden flex-wrap gap-3 md:flex">
        {filters.map((filter) => (
          <Button
            onClick={() => selectFilter(filter)}
            className={cn(
              "body-medium rounded-lg px-6 py-3 capitalize shadow-none",
              selectedFilter === filter.value
                ? "bg-primary-100 dark:bg-dark-400 text-primary-500"
                : "bg-light-800 text-light-500 dark:bg-dark-300 dark:text-light-500 hover:bg-primary-100 hover:dark:bg-dark-400"
            )}
            key={filter.value}
          >
            {filter.name}
          </Button>
        ))}
      </div>
    </>
  );
};
