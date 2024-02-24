import { VariantProps } from "class-variance-authority";
import { useFilter } from "../lib/hooks/useFilter";
import { cn } from "../lib/utils";
import { Option } from "../types/filters";
import { Button, buttonVariants } from "../ui/button";

interface SelectFilterButtonGroupProps {
  filters: Option[];
  queryKey: string;
  route?: string;
  paramsToRemove?: string[];
  variant?: VariantProps<typeof buttonVariants>["variant"];
  size?: VariantProps<typeof buttonVariants>["size"];
}

const SelectFilterButtonGroup = ({
  filters,
  queryKey,
  route,
  paramsToRemove = [],
  variant = "default",
  size = "default",
}: SelectFilterButtonGroupProps) => {
  const { selectedFilter, setSelectedFilter } = useFilter({
    queryKey,
    route,
    paramsToRemove,
  });

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
      {filters.map((filter) => (
        <Button
          onClick={() => selectFilter(filter)}
          className={cn("body-medium rounded-lg px-6 py-3 capitalize shadow-none")}
          key={filter.value}
          variant={
            (selectedFilter === filter.value ? `selected-${variant}` : variant) as VariantProps<
              typeof buttonVariants
            >["variant"]
          }
          size={size}
        >
          {filter.name}
        </Button>
      ))}
    </>
  );
};

export default SelectFilterButtonGroup;
