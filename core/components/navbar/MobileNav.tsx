"use client";

import { sidebarLinks } from "@/shared/constants/sidebar-links";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/shared/ui/sheet";
import Image from "next/image";
import { useState } from "react";
import NavLink from "./NavLink";

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
          className="dark:invert sm:hidden"
          priority={true}
        />
      </SheetTrigger>
      <SheetContent className="border-none bg-light-900 dark:bg-dark-200">
        <SheetClose asChild>
          <section className="flex h-full flex-col gap-6 pt-16">
            {sidebarLinks.map((link) => {
              return (
                <SheetClose asChild key={link.route}>
                  <NavLink link={link} />
                </SheetClose>
              );
            })}
          </section>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}
