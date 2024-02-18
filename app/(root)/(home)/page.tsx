import { SearchInput } from "@/shared/components/SearchInput";
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
    filter: searchParams.filter as string,
  });

  return (
    <>
      <QuestionsFilters>
        <SearchInput placeholder="Search through Questions..." otherClasses="flex-1" />
      </QuestionsFilters>

      <QuestionsList questions={questions} />
    </>
  );
}
