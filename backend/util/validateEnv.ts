// Envalid is a small library for validating and accessing
// environment variables in Node.js programs
import "dotenv/config";
import { cleanEnv, port, str } from "envalid";

export default cleanEnv(process.env, {
  MONGO_CONNECTION_STRING: str(),
  PORT: port(),
});
