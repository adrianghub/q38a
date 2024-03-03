import { sidebarLinks } from "@/shared/constants/sidebar-links";
import { Button } from "@/shared/ui/button";
import { SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import NavLink from "./navbar/NavLink";

const LeftSidebar = () => (
  <section className="custom-scrollbar background-light900_dark200 light-border sticky top-0 hidden h-screen flex-col items-center gap-6 px-4 pt-36 shadow-light-300 dark:shadow-none sm:flex lg:items-start">
    <div className="flex flex-1 flex-col gap-4">
    {sidebarLinks.map((link) => (
      <NavLink key={link.route} link={link} paragraphClasses="hidden lg:block" />
    ))}

    <SignedOut>
          <div className="flex flex-col gap-3">
              <Link href="/sign-in">
                <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                  <Image 
                    src="/assets/icons/account.svg"
                    alt="login"
                    width={20}
                    height={20}
                    className="invert-colors lg:hidden"
                  /> 
                  <span className="primary-text-gradient max-lg:hidden">Log In</span>
                </Button>
              </Link>
          
              <Link href="/sign-up">
                <Button className='small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none'>
                <Image 
                    src="/assets/icons/sign-up.svg"
                    alt="sign up"
                    width={20}
                    height={20}
                    className="invert-colors lg:hidden"
                  /> 
                  <span className="max-lg:hidden">Sign up</span>
                </Button>
              </Link>
          </div>
        </SignedOut>
    </div>
  </section>
);

export default LeftSidebar;
