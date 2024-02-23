"use server";

import { ViewQuestionParams } from "@/shared/types/shared";
import { connectToDatabase } from "../db/db";
import InteractionModel from "../db/models/interaction.model";
import QuestionModel from "../db/models/question.model";

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    await connectToDatabase();

    const { questionId, userId } = params;

    await QuestionModel.findByIdAndUpdate(questionId, {
      $inc: { views: 1 },
    });

    if (userId) {
      const existingInteraction = await InteractionModel.findOne({
        userId,
        action: "view",
        question: questionId,
      });

      if (existingInteraction) {
        console.log("User already viewed this question");
      }

      await InteractionModel.create({
        userId,
        action: "view",
        question: questionId,
      });
    }
  } catch (error) {
    console.error("Error viewing question", error);
    throw new Error("Error viewing question");
  }
}
