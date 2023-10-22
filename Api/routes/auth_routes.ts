import express from "express";
import {
  GoogleController,
  SignInController,
  SignOutController,
  SignUpController,
} from "../controller/auth_controller";
export const authRouter = express.Router();

authRouter.post("/signup", SignUpController);
authRouter.post("/signin", SignInController);
authRouter.get("/signout", SignOutController);
authRouter.post("/google", GoogleController);
