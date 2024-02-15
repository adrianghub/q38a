import { getUserById } from "@/shared/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import QuestionForm from "./_components/QuestionForm";

const Page = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const currentUser = await getUserById({ userId });

  if (!currentUser) redirect("/sign-in");

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <QuestionForm userId={JSON.stringify(currentUser._id)} />
      </div>
    </>
  );
};

export default Page;
