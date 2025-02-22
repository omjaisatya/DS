import { connect, disconnect, Connection } from "mongoose";
import { MONGO_URI } from "../config/envConfig";
import { log } from "console";

async function connectToDatabase(): Promise<Connection | void> {
  try {
    await connect(MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
    throw new Error("Could not connect to DB");
  }
}

async function disconnectToDatabase(): Promise<void> {
  try {
    await disconnect();
  } catch (error) {
    console.log(error);
    throw new Error("Could not disscont to DB");
  }
}

export { connectToDatabase, disconnectToDatabase };
