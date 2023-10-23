import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { HTTP_STATUS_CODES, MESSAGES } from "../constants/codes-messages";

export const noEndPointController: RequestHandler = (req, res, next) => {
  next(
    createHttpError(HTTP_STATUS_CODES.NOT_FOUND, MESSAGES.ENDPOINT_NOT_FOUND)
  );
};
