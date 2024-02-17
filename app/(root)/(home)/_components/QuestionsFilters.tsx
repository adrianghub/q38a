"use client";

import { Button } from "@/core/components/ui/button";
import { SearchInput } from "@/shared/components/SearchInput";
import { SelectInput } from "@/shared/components/SelectInput";
import { QuestionFilters } from "@/shared/constants/filters";
import { cn } from "@/shared/lib/utils";
import { Option } from "@/shared/types/filters";
import { useState } from "react";

const filters: Option[] = QuestionFilters;

export const QuestionsFilters = () => {
  const [selectedFilter, setSelectedFilter] = useState<Option | null>(null);

  const selectFilter = (filter: Option) => {
    const foundFilter = filters.find((f) => f.value === filter.value);

    if (foundFilter === selectedFilter) {
      setSelectedFilter(null);
      return;
    }

    if (foundFilter) {
      setSelectedFilter(foundFilter);
    }
  };

  return (
    <>
      <div className="flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <SearchInput placeholder="Search through Questions..." otherClasses="flex-1" />

        <SelectInput
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
              selectedFilter === filter
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
