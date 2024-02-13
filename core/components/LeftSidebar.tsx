import { sidebarLinks } from "@/shared/constants/sidebar-links";
import NavLink from "./navbar/NavLink";

const LeftSidebar = () => (
  <section className="custom-scrollbar background-light900_dark200 light-border sticky top-0 hidden h-screen flex-col items-center gap-6 px-4 pt-36 shadow-light-300 dark:shadow-none sm:flex lg:items-start">
    {sidebarLinks.map((link) => (
      <NavLink key={link.route} link={link} paragraphClasses="hidden lg:block" />
    ))}
  </section>
);

export default LeftSidebar;
