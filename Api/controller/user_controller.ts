import { RequestHandler } from "express";

export const testUserApiController: RequestHandler<
  unknown,
  unknown,
  unknown,
  unknown
> = (req, res) => {
  res.json({ message: "This is a test api" });
};
