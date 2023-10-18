import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { isHttpError } from "http-errors";
import { authRouter } from "../routes/auth_routes";
import { userRouter } from "../routes/user_routes";
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "DELETE", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// all the middle ware executes in sequence thus error middle ware must be at the bottom
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  //console.error(error);
  let errorMessage = "Something went wrong";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  return res.status(statusCode).send({ success: false, error: errorMessage });
});
export default app;
