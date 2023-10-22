import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import {
  HTTP_STATUS_CODES,
  HTTP_STATUS_MESSAGE,
} from "../constants/codes-messages";
interface JwtPayload {
  id: string; // Assuming 'userId' is a property in the JWT payload
  iat: number;
  // Add other properties you expect in the JWT payload
}
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createHttpError(401, "Unauthorized"));
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET!,
    (err: jwt.VerifyErrors | null, payload: any) => {
      if (err) {
        return next(
          createHttpError(
            HTTP_STATUS_CODES.FORBIDDEN,
            HTTP_STATUS_MESSAGE.FORBIDDEN
          )
        );
      }
      if (!payload || typeof payload !== "object") {
        return next(
          createHttpError(
            HTTP_STATUS_CODES.FORBIDDEN,
            HTTP_STATUS_MESSAGE.FORBIDDEN
          )
        );
      }
      const user = payload as JwtPayload; // Cast the payload to your JwtPayload type
      console.log(user.id);
      req.body.tokenUserId = user.id; // Attach the user to the request object
      next();
    }
  );
};