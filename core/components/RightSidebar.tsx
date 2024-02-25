import { TagPill } from "@/shared/components/TagPill";
import { getTopQuestions } from "@/shared/lib/actions/questions.action";
import { getPopularTags } from "@/shared/lib/actions/tag.actions";
import Image from "next/image";
import Link from "next/link";

const RightSidebar = async () => {
  const topQuestions = await getTopQuestions();
  const popularTags = await getPopularTags();

  return (
    <aside className="custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l px-4 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {topQuestions.map((question) => (
            <Link
              key={question._id}
              href={`/questions/${question._id}`}
              className="flex w-full cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">{question.title}</p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="right chevron"
                width={20}
                height={20}
                className="dark:invert"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>

        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag) => (
            <TagPill key={tag._id} tag={tag} showCount />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
