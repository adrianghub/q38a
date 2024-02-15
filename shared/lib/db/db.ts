import db from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL is missing");
  }

  db.set("strictQuery", true);

  if (isConnected) {
    console.log("=> using existing database connection");
    return;
  }

  console.log("=> using new database connection");

  try {
    const dbConnection = await db.connect(process.env.MONGODB_URL, {
      dbName: "klustertestowy",
    });
    isConnected = !!dbConnection.connections[0].readyState;
  } catch (error) {
    console.error("Error connecting to database", error);
  }
};
