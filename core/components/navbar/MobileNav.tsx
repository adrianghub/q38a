"use client";

import { sidebarLinks } from "@/shared/constants/sidebar-links";
import { Button } from "@/shared/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/shared/ui/sheet";
import { SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
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
        <div className="flex flex-col gap-4">
        <SheetClose asChild>
          <section className="flex h-full flex-col gap-4 pt-16">
            {sidebarLinks.map((link) => {
              return (
                <SheetClose asChild key={link.route}>
                  <NavLink link={link} />
                </SheetClose>
              );
            })}
          </section>
         </SheetClose> 

          <SignedOut>
          <div className="flex flex-col gap-3">
            <SheetClose asChild>
              <Link href="/sign-in">
                <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                  <span className="primary-text-gradient">Log In</span>
                </Button>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href="/sign-up">
                <Button className='small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none'>
                  Sign Up
                </Button>
              </Link>
            </SheetClose>
          </div>
        </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
}
