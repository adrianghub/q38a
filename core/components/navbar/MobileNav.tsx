"use client";

import { LogoLink } from "@/shared/components/LogoLink";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/shared/components/ui/sheet";
import { sidebarLinks } from "@/shared/constants/sidebar-links";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Image
          src="/assets/icons/hamburger.svg"
          width={36}
          height={36}
          alt="menu icon"
          className="invert-colors sm:hidden"
          priority={true}
        />
      </SheetTrigger>
      <SheetContent className="border-none bg-light-900 dark:bg-dark-200">
        <LogoLink />

        <SheetClose asChild>
          <NavContent />
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}

const NavContent = () => {
  const pathname = usePathname();

  return (
    <section className="flex h-full flex-col gap-6 pt-16">
      {sidebarLinks.map((link) => {
        const isActive =
          (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;

        return (
          <SheetClose asChild key={link.route}>
            <Link
              href={link.route}
              className={cn(
                "flex items-center justify-start gap-4 bg-transparent p-4",
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
              <p className={cn(isActive ? "base-bold" : "base-medium")}>{link.label}</p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};
