import { RequestHandler } from "express";
import { HTTP_STATUS_CODES } from "../constants/codes-messages";
export const cookieController: RequestHandler<
  unknown,
  unknown,
  unknown,
  unknown
> = (req, res, next) => {
  res
    .status(HTTP_STATUS_CODES.OK)
    .send({ success: true, message: "Token Exists" });
};
