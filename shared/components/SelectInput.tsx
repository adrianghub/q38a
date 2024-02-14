import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { cn } from "../lib/utils";
import { Option } from "../types/filters";

type SelectInputProps = {
  options: Option[];
  placeholder: string;
  containerClasses?: string;
  otherClasses?: string;
};

export const SelectInput = ({
  options,
  placeholder,
  containerClasses,
  otherClasses,
}: SelectInputProps) => {
  return (
    <div className={cn("relative", containerClasses)}>
      <Select>
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
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};