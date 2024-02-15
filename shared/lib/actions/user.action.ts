"use server";

import { connectToDatabase } from "../db/db";
import User from "../db/models/user.model";

export async function getUserById(params: any) {
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
