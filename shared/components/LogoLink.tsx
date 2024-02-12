import Link from "next/link";
import { cn } from "../lib/utils";

export const LogoLink = ({ classNames }: { classNames?: string }) => {
  return (
    <Link href="/" className="flex items-center gap-1">
      <p
        className={cn(
          `h2-bold font-nunitoSans text-dark100_light900 dark:text-light-900`,
          classNames
        )}
      >
        Q<span className="text-primary-500">38</span>A
      </p>
    </Link>
  );
};
