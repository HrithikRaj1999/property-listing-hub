import express from "express";
import { testUserApiController } from "../controller/user_controller";
export const userRouter = express.Router();

userRouter.get("/test", testUserApiController);
