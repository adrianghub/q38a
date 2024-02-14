import { Author } from "./author";
import { Option } from "./filters";

export type QuestionStatisticsKey = "views" | "answers" | "votes";

export type Tag = {
  _id: number;
  name: string;
  totalQuestions?: number;
};

export type Statistics = {
  // eslint-disable-next-line no-unused-vars
  [key in QuestionStatisticsKey]: Option;
};

export type Question = {
  _id: number;
  title: string;
  tags: Tag[];
  author: Author;
  publishedAt: string;
  statistics: Statistics;
};
