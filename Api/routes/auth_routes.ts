import express from "express";
import {
  SignInController,
  SignUpController,
} from "../controller/auth_controller";
export const authRouter = express.Router();

authRouter.post("/signup", SignUpController);
authRouter.post("/signin", SignInController);
