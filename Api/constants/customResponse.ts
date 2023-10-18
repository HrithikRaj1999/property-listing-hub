import { Response } from "express";
interface CustomResponseType {
  (res: Response, code: number, message?: string, object?: unknown): void;
}
export const customResponse: CustomResponseType = (
  res,
  code = 200,
  message = "",
  object = {}
) => {
  return res.status(code).send({
    message,
    object,
  });
};
