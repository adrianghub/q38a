import { clsx, type ClassValue } from "clsx";
import qs from "query-string";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildUrlQuery({
  params,
  keys,
  values,
}: {
  params: string;
  keys: string[];
  values: string[];
}) {
  const currentParams = qs.parse(params);

  keys.forEach((key, index) => {
    currentParams[key] = values[index];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentParams,
    },
    {
      skipNull: true,
      skipEmptyString: true,
    }
  );
}

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: {
  params: string;
  keysToRemove: string[];
}) => {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: currentUrl,
  });
};
