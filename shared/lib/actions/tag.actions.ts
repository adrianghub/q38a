import { GetAllTagsParams, GetTopInteractedTagsParams } from "@/shared/types/shared";
import { connectToDatabase } from "../db/db";
import Tag, { ITag } from "../db/models/tag.model";
import User from "../db/models/user.model";

export async function getTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();

    // const { page = 1, pageSize = 20, filter, searchQuery } = params

    const tags: ITag[] = await Tag.find({});

    return tags;
  } catch (error) {
    console.error("Error getting tags", error);
    throw new Error("Error getting tags");
  }
}

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");

    // TODO: Get the top interacted tags by the user
    return [
      { _id: 1, name: "javascript" },
      { _id: 2, name: "react" },
      { _id: 3, name: "nodejs" },
    ];
  } catch (error) {
    console.error("Error getting users", error);
    throw new Error("Error getting users");
  }
}

export async function getPopularTags() {
  try {
    connectToDatabase();

    const tags = await Tag.aggregate([
      {
        $lookup: {
          from: "questions",
          localField: "_id",
          foreignField: "tags",
          as: "questions",
        },
      },
      {
        $project: {
          name: 1,
          totalQuestions: { $size: "$questions" },
        },
      },
      {
        $sort: { totalQuestions: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    return tags;
  } catch (error) {
    console.error("Error getting popular tags", error);
    throw new Error("Error getting popular tags");
  }
}
