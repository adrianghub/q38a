import { getQuestionById } from "@/shared/lib/actions/questions.action";
import ParseHTML from "./_components/ParseHTML";

const Page = async ({ params }: { params: { id: string } }) => {
  const question = await getQuestionById({ id: params.id });

  return (
    <>
      <h1 className="h1-bold">{question.title}</h1>

      <ParseHTML content={question.description} />
    </>
  );
};

export default Page;
