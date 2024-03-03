import { TagPill } from "@/shared/components/TagPill";
import { getQuestionById } from "@/shared/lib/actions/questions.action";
import { Author } from "@/shared/types/author";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import ParseHTML from "./_components/ParseHTML";

const Page = async ({ params }: { params: { id: string } }) => {
  const { userId: clerkId } = auth();

  // let loggedUser;

  if(clerkId) {
    // loggedUser = await getUserById({ userId: clerkId })
  }

  const question = await getQuestionById({ id: params.id });

  if (!question) {
    return null;
  }

  const questionAuthor = question.author as unknown as Author;

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link href={`/profile/${questionAuthor.clerkId}`}
          className="flex items-center justify-start gap-1"  >
            <Image 
              src={questionAuthor.avatar}
              className="rounded-full"
              width={22}
              height={22}
              alt="profile"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {questionAuthor.name}
            </p>
          </Link>
          <div className="flex justify-end">
            {/* <Votes 
              type="Question"
              itemId={JSON.stringify(result._id)}
              userId={JSON.stringify(loggedUser._id)}
              upvotes={result.upvotes.length}
              hasupVoted={result.upvotes.includes(loggedUser._id)}
              downvotes={result.downvotes.length}
              hasdownVoted={result.downvotes.includes(loggedUser._id)}
              hasSaved={loggedUser?.saved.includes(result._id)}
            /> */}
          </div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {question.title}
        </h2>
      </div>

      <ParseHTML content={question.description} />

      <div className="mt-8 flex flex-wrap gap-2">
        {question.tags.map((tag) => (
          <TagPill key={tag._id} tag={tag} />
        ))}
      </div>

      {/* Answer form */}
    </>
  );
};

export default Page;
