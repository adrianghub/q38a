import SelectFilterButtonGroup from "@/shared/components/SelectFilterButtonGroup";
import { GlobalSearchFilters as globalSearchFilters } from "@/shared/constants/filters";
import { forwardRef } from "react";

// eslint-disable-next-line react/display-name
export const GlobalSearchFilters = forwardRef<HTMLDivElement | null>((_, ref) => {
  return (
    <div ref={ref} className="flex flex-col">
      <p className="text-dark400_light900 paragraph-semibold px-5">Filters</p>
      <div className="ml-3 mt-3 flex gap-2">
        <SelectFilterButtonGroup
          filters={globalSearchFilters}
          queryKey="type"
          variant="popover"
          size="popover"
        />
      </div>
    </div>
  );
});
