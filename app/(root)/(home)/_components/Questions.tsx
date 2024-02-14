"use client";

import { Button } from "@/shared/components/ui/button";
import Link from "next/link";
import { QuestionsFilters } from "./QuestionsFilters";
import { QuestionsList } from "./QuestionsList";

const Questions = () => (
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

      <QuestionsList />
    </div>
  </>
);

export default Questions;