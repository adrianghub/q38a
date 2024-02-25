"use server";

import { Question } from "@/shared/types/questions";
import {
  CreateQuestionParams,
  GetQuestionByIdParams,
  GetQuestionsParams,
} from "@/shared/types/shared";
import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../db/db";
import QuestionModel, { IQuestion } from "../db/models/question.model";
import Tag from "../db/models/tag.model";
import User from "../db/models/user.model";

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase();

    const { searchQuery, filter, page = 1, pageSize = 3 } = params;

    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof QuestionModel> = {};

    if (searchQuery) {
      const regex = new RegExp(searchQuery ?? "", "i");

      query.$or = [{ title: { $regex: regex } }, { description: { $regex: regex } }];
    }

    let sortOptions = {};

    switch (filter) {
      case "newest":
        sortOptions = { publishedAt: -1 };
        break;
      case "frequent":
        sortOptions = { answers: -1 };
        break;
      case "unanswered":
        query.answers = { $size: 0 };
        break;
      default:
        sortOptions = { publishedAt: -1 };
        break;
    }

    const questionsDto = (await QuestionModel.find(query)
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOptions)) as IQuestion[];

    const totalQuestions = await QuestionModel.countDocuments(query);
    const hasNext = totalQuestions > skipAmount + pageSize;

    return { questions: mapQuestionsDtoToQuestions(questionsDto), hasNext };
  } catch (error) {
    console.error("Error getting questions", error);
    throw error;
  }
}

export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    connectToDatabase();

    const { id } = params;

    const question = (await QuestionModel.findById(id)
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({
        path: "author",
        model: User,
      })) as IQuestion;

    return question;
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

const mapQuestionsDtoToQuestions = (questionsDto: IQuestion[]): Question[] =>
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
    }));

export async function getTopQuestions() {
  try {
    connectToDatabase();

    const questions = await QuestionModel.find().sort({ views: -1, upvotes: -1 }).limit(5);

    return mapQuestionsDtoToQuestions(questions);
  } catch (error) {
    console.error("Error getting top questions", error);
    throw error;
  }
}
