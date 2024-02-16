"use server";

import {
  CreateQuestionParams,
  GetQuestionsParams,
  Question,
  QuestionDto,
} from "@/shared/types/questions";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../db/db";
import QuestionModel from "../db/models/question.model";
import Tag from "../db/models/tag.model";
import User from "../db/models/user.model";

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase();

    const questionsDto = (await QuestionModel.find({})
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .sort({ publishedAt: -1 })) as QuestionDto[];

    return mapQuestionsDtoToQuestions(questionsDto);
  } catch (error) {
    console.error("Error getting questions", error);
    throw error;
  }
}

export async function createQuestion(params: CreateQuestionParams) {
  try {
    connectToDatabase();

    const { title, description, tags, authorId, pathname } = params;

    const question = await QuestionModel.create({
      title,
      description,
      author: authorId,
    });

    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag._id);
    }

    await QuestionModel.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    revalidatePath(pathname);

    // TODO: Create an interaction for the author
    // Increment author's reputation by 5 points for creating a question
  } catch (error) {
    console.error("Error creating question", error);
    throw error;
  }
}

const mapQuestionsDtoToQuestions = (questionsDto: QuestionDto[]): Question[] =>
  questionsDto
    // @ts-ignore
    .map(({ _doc: doc }) => ({
      ...doc,
      statistics: {
        views: {
          name: "Views",
          value: doc.views,
        },
        answers: {
          name: "Answers",
          value: doc.answers?.length,
        },
        votes: {
          name: "Votes",
          value: doc.upvotes.length + doc.downvotes.length,
        },
      },
    }))
    .map(({ views, answers, votes, ...rest }) => rest);
