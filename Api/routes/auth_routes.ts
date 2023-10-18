import express from "express";
import { SignUpController } from "../controller/auth_controller";
export const authRouter = express.Router();

authRouter.post("/signup", SignUpController);
