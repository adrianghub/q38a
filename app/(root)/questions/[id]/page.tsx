import { TagPill } from "@/shared/components/TagPill";
import { getQuestionById } from "@/shared/lib/actions/questions.action";
import { getUserById } from "@/shared/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { Votes } from "../../../../shared/components/Votes";
import ParseHTML from "./_components/ParseHTML";

const Page = async ({ params }: { params: { id: string } }) => {
  const question = await getQuestionById({ id: params.id });
  const { userId: clerkId } = auth();

  const user = await getUserById({ userId: clerkId ?? "" });

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="h1-bold">{question.title}</h1>
        <Votes
          type="question"
          itemId={JSON.stringify(question._id)}
          userId={JSON.stringify(user)}
        />
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
