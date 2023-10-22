import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import createHttpError from "http-errors";
import morgan from "morgan";
import { HTTP_STATUS_CODES } from "../constants/codes-messages";
import { authRouter } from "../routes/auth_routes";
import { userRouter } from "../routes/user_routes";
import errorHandler from "../util/error";
import { verifyToken } from "../util/verifyUser";
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
app.use("/api/checkCookie", verifyToken, (req, res, next) => {
  res
    .status(HTTP_STATUS_CODES.OK)
    .send({ success: true, message: "Token Exists" });
});
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/*", (req, res, next) => {
  next(createHttpError(404, "There is no Route ,Endpoint Not Found"));
});
app.use(errorHandler);

export default app;
