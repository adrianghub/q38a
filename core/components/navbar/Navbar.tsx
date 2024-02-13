import { LogoLink } from "@/shared/components/LogoLink";
import { SignedIn, UserButton } from "@clerk/nextjs";
import GlobalSearch from "./GlobalSearch";
import { MobileNav } from "./MobileNav";
import { ThemeMenuBar } from "./ThemeMenuBar";

const Navbar = () => (
  <nav className="flex-between background-light900_dark200 fixed isolate z-10 w-full gap-5 p-6 shadow-light-300 dark:shadow-none">
    <LogoLink />

    <GlobalSearch />
    <div className="flex gap-5">
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

export default Navbar;
