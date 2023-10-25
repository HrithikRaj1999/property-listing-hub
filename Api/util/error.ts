import { Request, Response } from "express";
import { isHttpError } from "http-errors";
import mongoose from "mongoose";
// all the middle ware executes in sequence thus error middle ware must be at the bottom
const errorHandler = (error: unknown, req: Request, res: Response) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  if (error instanceof mongoose.Error.ValidationError) {
    return res.status(400).send({ error: error.message });
  }
  if (isHttpError(error)) {
    statusCode = error.status;
    message = error.message;
  }
  return res.status(statusCode).json({
    success: false,
    message,
  });
};
export default errorHandler;
