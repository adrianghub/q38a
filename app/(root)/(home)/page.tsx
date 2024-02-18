import { getQuestions } from "@/shared/lib/actions/questions.action";
import { Question } from "@/shared/types/questions";
import { QuestionsFilters } from "./_components/QuestionsFilters";
import { QuestionsList } from "./_components/QuestionsList";

export default async function HomePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const questions: Question[] = await getQuestions({
    searchQuery: ((searchParams.q || "") as string).trim(),
  });

  return (
    <>
      <QuestionsFilters />

      <QuestionsList questions={questions} />
    </>
  );
}
