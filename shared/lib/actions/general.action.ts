"use server";

import { SearchParams } from "@/shared/types/shared";
import { connectToDatabase } from "../db/db";
import QuestionModel from "../db/models/question.model";
import TagModel from "../db/models/tag.model";
import UserModel from "../db/models/user.model";

const SearchableTypes = ["question", "user", "tag"];

export async function getGlobalSearchResults(params: SearchParams) {
  try {
    await connectToDatabase();

    const { query, type } = params;

    const regexQuery = { $regex: query, $options: "i" };

    const results = [] as any[];

    const modelsAndTypes = [
      {
        model: QuestionModel,
        searchField: "title",
        type: "question",
      },
      {
        model: UserModel,
        searchField: "name",
        type: "user",
      },
      {
        model: TagModel,
        searchField: "name",
        type: "tag",
      },
    ];

    const typeLower = type?.toLowerCase();

    if (!typeLower || !SearchableTypes.includes(typeLower)) {
      // Search all types
      for (const modelInfo of modelsAndTypes) {
        const queryResult = await modelInfo.model
          // @ts-ignore
          .find({
            [modelInfo.searchField]: regexQuery,
          })
          .limit(2);

        results.push(
          ...queryResult.map((item: any) => ({
            id: modelInfo.type === "user" ? item.clerkId : item._id,
            type: modelInfo.type,
            title: item[modelInfo.searchField],
          }))
        );
      }
    } else {
      // Search specific type
      const modelInfo = modelsAndTypes.find((m) => m.type === typeLower);

      if (!modelInfo) {
        throw new Error("Invalid search type");
      }

      const queryResult = await modelInfo.model
        // @ts-ignore
        .find({
          [modelInfo.searchField]: regexQuery,
        })
        .limit(8);

      results.push(
        ...queryResult.map((item: any) => ({
          id: modelInfo.type === "user" ? item.clerkId : item._id,
          type: modelInfo.type,
          title: item[modelInfo.searchField],
        }))
      );
    }

    return JSON.stringify(results);
  } catch (error) {
    console.error("Error connecting to the database", error);
    throw new Error("Error connecting to the database");
  }
}
