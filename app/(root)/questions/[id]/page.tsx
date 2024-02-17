import { getQuestionById } from "@/shared/lib/actions/questions.action";

const Page = async ({ params }: { params: { id: string } }) => {
  const question = await getQuestionById({ id: params.id });

  return (
    <div>
      {question.title} - {params.id}
    </div>
  );
};

export default Page;
