import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { HTTP_STATUS_CODES, HTTP_STATUS_MESSAGE } from "../constants/data";
import { JwtPayload } from "../../dataTypes";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(createHttpError(401, "Unauthorized"));
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET!,
    (err: jwt.VerifyErrors | null, payload: unknown) => {
      if (err) {
        return next(
          createHttpError(
            HTTP_STATUS_CODES.FORBIDDEN,
            HTTP_STATUS_MESSAGE.FORBIDDEN,
          ),
        );
      }
      if (!payload || typeof payload !== "object") {
        return next(
          createHttpError(
            HTTP_STATUS_CODES.FORBIDDEN,
            HTTP_STATUS_MESSAGE.FORBIDDEN,
          ),
        );
      }
      const user = payload as JwtPayload; // Cast the payload to your JwtPayload type

      req.body.tokenUserId = user.id; // Attach the user to the request object
      next();
    },
  );
};
