import { TagPill } from "@/shared/components/TagPill";
import Image from "next/image";
import Link from "next/link";

const topQuestions = [
  { _id: 1, title: "How to use React Query?" },
  { _id: 2, title: "How to use React Query?" },
  { _id: 3, title: "How to use React Query?" },
  { _id: 4, title: "How to use React Query?" },
  { _id: 5, title: "How to use React Query?" },
];

const popularTags = [
  {
    _id: 1,
    name: "javascript",
    totalQuestions: 1,
  },
  {
    _id: 2,
    name: "react",
    totalQuestions: 5,
  },
  {
    _id: 3,
    name: "typescript",
    totalQuestions: 10,
  },
  {
    _id: 4,
    name: "nextjs",
    totalQuestions: 2,
  },
  {
    _id: 5,
    name: "tailwindcss",
    totalQuestions: 2,
  },
];

const RightSidebar = () => {
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
