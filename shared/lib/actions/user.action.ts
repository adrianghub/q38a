"use server";

import {
  CreateUserParams,
  DeleteUserParams,
  GetUserByIdParams,
  UpdateUserParams,
} from "@/shared/types/shared";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../db/db";
import QuestionModel from "../db/models/question.model";
import User from "../db/models/user.model";

export async function getUserById(params: GetUserByIdParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({
      clerkId: userId,
    });

    return user;
  } catch (error) {
    console.error("Error getting user", error);
  }
}

export async function createUser(params: CreateUserParams) {
  try {
    connectToDatabase();

    const newUser = await User.create(params);

    console.log(newUser);

    return newUser;
  } catch (error) {
    console.error("Error creating user", error);
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();

    const { clerkId, updateData, pathname } = params;

    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    revalidatePath(pathname);
  } catch (error) {
    console.error("Error updating user", error);
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();

    const { clerkId } = params;

    const user = await User.findOne({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    // const userQuestionIds = await QuestionModel.find({
    //   author: user._id,
    // }).distinct("_id");

    await QuestionModel.deleteMany({ author: user._id });

    // delete user answers, comments, etc.

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.error("Error deleting user", error);
  }
}
