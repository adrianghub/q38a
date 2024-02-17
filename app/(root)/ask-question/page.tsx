import { getUserById } from "@/shared/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import QuestionForm from "./_components/QuestionForm";

const Page = async () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const currentUser = await getUserById({ userId });

  return <QuestionForm userId={JSON.stringify(currentUser?._id)} />;
};

export default Page;
