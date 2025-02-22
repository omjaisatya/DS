import * as dotenv from "dotenv";
dotenv.config();

const {
  MONGO_URI,
  PORT,
  EMAIL_USER,
  EMAIL_PASS,
  JWT_SECRET,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
} = process.env;

if (!MONGO_URI) {
  throw new Error("MONGODB_URL is not defined in the environment variables");
}

export {
  MONGO_URI,
  PORT,
  EMAIL_PASS,
  EMAIL_USER,
  JWT_SECRET,
  AWS_ACCESS_KEY_ID,
  AWS_REGION,
  AWS_SECRET_ACCESS_KEY,
};
