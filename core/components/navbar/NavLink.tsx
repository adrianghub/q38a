"use client";

import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  link: {
    route: string;
    imgURL: string;
    label: string;
  };
  paragraphClasses?: string;
};

const NavLink = ({ link, paragraphClasses }: NavLinkProps) => {
  const pathname = usePathname();

  const isActive =
    (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;

  return (
    <Link
      href={link.route}
      className={cn(
        "flex items-center lg:w-[250px] lg:justify-start gap-4 bg-transparent p-4 w-full sm:justify-center",
        isActive ? "primary-gradient rounded-lg text-light-900" : "text-dark300_light900"
      )}
    >
      <Image
        src={link.imgURL}
        alt={link.label}
        width={20}
        height={20}
        className={cn(isActive ? "invert" : "dark:invert")}
      />
      <p className={cn(isActive ? "base-bold" : "base-medium", paragraphClasses)}>{link.label}</p>
    </Link>
  );
};

export default NavLink;
