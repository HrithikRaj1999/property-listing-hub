import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
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
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  //console.error(error);
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  return res.status(statusCode).send({
    success: false,
    message,
  });
});
export default app;
