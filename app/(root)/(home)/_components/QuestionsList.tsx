import NoResult from "@/shared/components/NoResult";
import { QuestionCard } from "./QuestionCard";

const questions = [
  {
    _id: 1,
    title:
      "The Lightning Component c:LWC_PizzaTracker generated invalid output for field status. Error How to solve this",
    description: "I am new",
    tags: [
      { _id: 1, name: "lwc" },
      { _id: 2, name: "javascript" },
      { _id: 3, name: "apex" },
    ],
    author: {
      _id: 1,
      name: "John Doe",
      avatarUrl: "https://randomuser",
    },
    publishedAt: "2021-10-10",
    statistics: {
      views: {
        name: "Views",
        value: 10,
      },
      answers: {
        name: "Answers",
        value: 2,
      },
      votes: {
        name: "Votes",
        value: 3,
      },
    },
  },
  {
    _id: 2,
    title: "How to create a new project?",
    description: "I am new",
    tags: [
      { _id: 1, name: "lwc" },
      { _id: 2, name: "javascript" },
      { _id: 3, name: "apex" },
    ],

    author: {
      _id: 2,
      name: "John Doe",
      avatarUrl: "https://randomuser",
    },
    publishedAt: "2021-10-10",
    statistics: {
      views: {
        name: "Views",
        value: 10,
      },
      answers: {
        name: "Answers",
        value: 2,
      },
      votes: {
        name: "Votes",
        value: 3,
      },
    },
  },
];

export const QuestionsList = () => (
  <div className="flex w-full flex-col gap-6">
    {questions.length > 1 ? (
      questions.map((question) => <QuestionCard key={question._id} {...question} />)
    ) : (
      <NoResult text="No questions found" />
    )}
  </div>
);
