import { NextFunction, Request, Response } from "express";
import { isHttpError } from "http-errors";
// all the middle ware executes in sequence thus error middle ware must be at the bottom
const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  if (isHttpError(error)) {
    statusCode = error.status;
    message = error.message;
  }
  res.status(statusCode).json({
    success: false,
    message,
  });
};
export default errorHandler;
