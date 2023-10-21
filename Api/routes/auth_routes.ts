import express from "express";
import {
  GoogleController,
  SignInController,
  SignUpController,
} from "../controller/auth_controller";
export const authRouter = express.Router();

authRouter.post("/signup", SignUpController);
authRouter.post("/signin", SignInController);
authRouter.post("/google", GoogleController);
