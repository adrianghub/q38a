import NoResult from "@/shared/components/NoResult";
import { SearchInput } from "@/shared/components/SearchInput";
import { SelectInput } from "@/shared/components/SelectInput";
import { TagFilters } from "@/shared/constants/filters";
import { getTags } from "@/shared/lib/actions/tag.actions";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const tags = await getTags({});

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Tags</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <SearchInput placeholder="Search by tag name..." otherClasses="flex-1" />

        <SelectInput
          options={TagFilters}
          placeholder="Select filter"
          containerClasses="flex"
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {tags.length > 0 ? (
          tags.map((tag) => (
            <Link key={tag._id} href={`/tags/${tag._id}`}>
              {tag.name}
            </Link>
          ))
        ) : (
          <NoResult text="No tags found." />
        )}
      </section>
    </>
  );
};

export default Page;
