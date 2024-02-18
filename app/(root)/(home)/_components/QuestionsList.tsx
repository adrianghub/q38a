import NoResult from "@/shared/components/NoResult";
import { Question } from "@/shared/types/questions";
import { QuestionCard } from "./QuestionCard";

export const QuestionsList = ({ questions }: { questions: Question[] }) => (
  <div className="flex w-full flex-col gap-6">
    {questions.length > 0 ? (
      <>
        {questions.map((question) => (
          <QuestionCard key={question._id} {...question} />
        ))}
      </>
    ) : (
      <NoResult text="No questions found." />
    )}
  </div>
);
