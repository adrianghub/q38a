"use server";

import console from "console";
import { connectToDatabase } from "../db/db";
import Question from "../db/models/question.model";
import Tag from "../db/models/tag.model";

export async function createQuestion(params: any) {
  try {
    connectToDatabase();

    const { title, description, tags, authorId, pathname } = params;

    const question = await Question.create({
      title,
      description,
      authorId,
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

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    // TODO: Create an interaction for the author
    // Increment author's reputation by 5 points for creating a question
  } catch (error) {
    console.error("Error creating question", error);
  }
}
