import express from "express";
import { HTTP_STATUS_CODES } from "../constants/codes-messages";
import {
  GoogleController,
  SignInController,
  SignOutController,
  SignUpController,
} from "../controller/auth_controller";
import { verifyToken } from "../util/verifyUser";
export const authRouter = express.Router();

authRouter.get("/checkCookie", verifyToken, (req, res, next) => {
  res
    .status(HTTP_STATUS_CODES.OK)
    .send({ success: true, message: "Token Exists" });
});
authRouter.post("/signup", SignUpController);
authRouter.post("/signin", SignInController);
authRouter.get("/signout", SignOutController);
authRouter.post("/google", GoogleController);
