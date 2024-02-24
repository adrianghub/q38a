import { useFilter } from "../lib/hooks/useFilter";
import { cn } from "../lib/utils";
import { Option } from "../types/filters";
import { Button } from "../ui/button";

const SelectFilterButtonGroup = ({ filters, queryKey, route, paramsToRemove }: any) => {
  const { selectedFilter, setSelectedFilter } = useFilter({ queryKey, route, paramsToRemove });

  const selectFilter = (filter: Option) => {
    const foundFilter = filters.find((f: any) => f.value === filter.value);

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
      {filters.map((filter: any) => (
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
    </>
  );
};

export default SelectFilterButtonGroup;
