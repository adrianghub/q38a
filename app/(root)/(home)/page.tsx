import { getQuestions } from "@/shared/lib/actions/questions.action";
import { Question } from "@/shared/types/questions";
import { QuestionsFilters } from "./_components/QuestionsFilters";
import { QuestionsList } from "./_components/QuestionsList";

export default async function Home() {
  const questions: Question[] = await getQuestions({});

  return (
    <>
      <QuestionsFilters />

      <QuestionsList questions={questions} />
    </>
  );
}
