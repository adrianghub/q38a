import { Button } from "@/core/components/ui/button";
import { getQuestions } from "@/shared/lib/actions/questions.action";
import { Question } from "@/shared/types/questions";
import Link from "next/link";
import { QuestionsFilters } from "./_components/QuestionsFilters";
import { QuestionsList } from "./_components/QuestionsList";

export default async function Home() {
  const questions: Question[] = await getQuestions({});

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-6">
        <QuestionsFilters />

        <QuestionsList questions={questions} />
      </div>
    </>
  );
}
