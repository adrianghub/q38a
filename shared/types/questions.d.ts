import { Schema } from "mongoose";
import { Author } from "./author";

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

export type QuestionDto = {
  _id: number;
  title: string;
  tags: Tag[];
  author: Author;
  publishedAt: string;
  views: number;
  answers: number;
  votes: number;
};

export type Question = {
  _id: number;
  title: string;
  tags: Tag[];
  author: Author;
  publishedAt: Date;
  statistics: Statistics;
};

export type GetQuestionsParams = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
};

export type CreateQuestionParams = {
  title: string;
  description: string;
  tags: string[];
  authorId: Schema.Types.ObjectId;
  pathname: string;
};
