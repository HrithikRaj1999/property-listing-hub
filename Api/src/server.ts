import dotenv from "dotenv";
import mongoose from "mongoose";
import { logger } from "../logger/logger";
import app from "./app";
import { MESSAGES } from "../constants/data";
dotenv.config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_STRING!);
    logger.info(MESSAGES.MONGO_CONNECTED);
    app.listen(process.env.PORT!, () => {
      logger.info(MESSAGES.SERVER_RUNNING + process.env.PORT!);
    });
  } catch (error: unknown) {
    logger.error(MESSAGES.MONGO_CON_ERROR, error);
  }
})();
