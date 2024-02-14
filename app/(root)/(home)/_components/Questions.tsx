"use client";

import { SearchInput } from "@/shared/components/SearchInput";
import { SelectInput } from "@/shared/components/SelectInput";
import { Button } from "@/shared/components/ui/button";
import { QuestionFilters } from "@/shared/constants/filters";
import Link from "next/link";
import { QuestionsFilters } from "./QuestionsFilters";

const Questions = () => {
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

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <SearchInput placeholder="Search through Questions..." classNames="flex-1" />

        <SelectInput
          options={QuestionFilters}
          placeholder="Select filter"
          containerClasses="hidden max-md:flex"
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <QuestionsFilters />
    </>
  );
};

export default Questions;
