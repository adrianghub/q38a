import NoResult from "@/shared/components/NoResult";
import { SearchInput } from "@/shared/components/SearchInput";
import { SelectFilterInput } from "@/shared/components/SelectFilterInput";
import { UserFilters } from "@/shared/constants/filters";
import { getUsers } from "@/shared/lib/actions/user.action";
import Link from "next/link";

const Page = async () => {
  const users = await getUsers({});

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <SearchInput placeholder="Search by username..." otherClasses="flex-1" route="/community" />

        <SelectFilterInput
          options={UserFilters}
          placeholder="Select filter"
          containerClasses="flex"
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {users.length > 0 ? (
          users.map((user) => (
            <Link key={user._id} href={`/profile/${user._id}`}>
              {user.name}
            </Link>
          ))
        ) : (
          <NoResult text="No users found." />
        )}
      </section>
    </>
  );
};

export default Page;
