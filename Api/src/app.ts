import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import createHttpError from "http-errors";
import morgan from "morgan";
import { authRouter } from "../routes/auth_routes";
import { userRouter } from "../routes/user_routes";
import errorHandler from "../util/error";
const app = express();
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "DELETE", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/*", (req, res, next) => {
  next(createHttpError(404, "Endpoint Not Found"));
});
app.use(errorHandler);

export default app;
