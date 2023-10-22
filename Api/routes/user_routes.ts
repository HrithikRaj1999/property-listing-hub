import express from "express";
import { updateUserController } from "../controller/user_controller";
import { verifyToken } from "../util/verifyUser";
export const userRouter = express.Router();

userRouter.put("/update/:id", verifyToken, updateUserController);
