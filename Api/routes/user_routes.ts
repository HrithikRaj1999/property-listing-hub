import express from "express";
import {
  deleteUserController,
  removeUserPicController,
  updateUserController,
  updateUserPicController,
} from "../controller/user_controller";
import { verifyToken } from "../util/verifyUser";
export const userRouter = express.Router();

userRouter.put("/update/:id", verifyToken, updateUserController);
userRouter.delete("/delete/:id", verifyToken, deleteUserController);
userRouter.put("/removePic/:id", verifyToken, removeUserPicController);
userRouter.put("/updatePic/:id", verifyToken, updateUserPicController);
