import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { MobileNav } from "./MobileNav";
import { ThemeMenuBar } from "./ThemeMenuBar";

const Navbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 fixed isolate z-10 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-1">
        <p className="h2-bold font-nunitoSans text-dark-100 dark:text-light-900 max-sm:hidden">
          Q<span className="text-primary-500">38</span>A
        </p>
      </Link>
      Search
      <div className="flex-between gap-5">
        <ThemeMenuBar />
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
              variables: {
                colorPrimary: "#ff7000",
              },
            }}
          />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
