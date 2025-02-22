import * as dotenv from "dotenv";
dotenv.config();

const { MONGO_URI, PORT, EMAIL_USER, EMAIL_PASS, JWT_SECRET } = process.env;

if (!MONGO_URI) {
  throw new Error("MONGODB_URL is not defined in the environment variables");
}

export { MONGO_URI, PORT, EMAIL_PASS, EMAIL_USER, JWT_SECRET };
