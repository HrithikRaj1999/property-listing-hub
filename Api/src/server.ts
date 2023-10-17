import mongoose from "mongoose";
import { MESSAGES } from "../constants/message";
import { logger } from "../logger/logger";
import cleanEnv from "../util/validateEnv";
import app from "./app";
const port = cleanEnv.PORT; //this will follow the schema of clean Env, so that undefined is not expected

(async () => {
  try {
    await mongoose.connect(cleanEnv.MONGO_CONNECTION_STRING);
    logger.info(MESSAGES.MONGO_CONNECTED);
    app.listen(port!, () => {
      logger.info(MESSAGES.SERVER_RUNNING + port);
    });
  } catch (error: any) {
    logger.error(MESSAGES.MONGO_CON_ERROR, error);
  }
})();
