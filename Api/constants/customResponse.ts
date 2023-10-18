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
    success: code === 200 || code === 201 || code === 202,
    message,
    object,
  });
};
