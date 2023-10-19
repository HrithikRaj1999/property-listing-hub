import dotenv from "dotenv";
import mongoose from "mongoose";
import { MESSAGES } from "../constants/api_message";
import { logger } from "../logger/logger";
import app from "./app";
dotenv.config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING!);
    logger.info(MESSAGES.MONGO_CONNECTED);
    app.listen(process.env.PORT!, () => {
      logger.info(MESSAGES.SERVER_RUNNING + process.env.PORT!);
    });
  } catch (error: any) {
    logger.error(MESSAGES.MONGO_CON_ERROR, error);
  }
})();
