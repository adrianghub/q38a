"use client";

import SelectFilterButtonGroup from "@/shared/components/SelectFilterButtonGroup";
import { SelectFilterInput } from "@/shared/components/SelectFilterInput";
import { HomePageFilters } from "@/shared/constants/filters";
import { Option } from "@/shared/types/filters";
import React from "react";

type QuestionsFiltersParams = {
  children: React.ReactNode;
  route?: string;
};

const filters: Option[] = HomePageFilters;

export const QuestionsFilters = ({ children, route = "/" }: QuestionsFiltersParams) => {
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
        <SelectFilterButtonGroup
          filters={filters}
          queryKey="filter"
          route={route}
          paramsToRemove={["page"]}
        />
      </div>
    </>
  );
};
