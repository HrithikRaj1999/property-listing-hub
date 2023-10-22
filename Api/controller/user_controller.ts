import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import {
  HTTP_STATUS_CODES,
  HTTP_STATUS_MESSAGE,
} from "../constants/codes-messages";
import userModel from "../models/userModel";

export const testUserApiController: RequestHandler<
  unknown,
  unknown,
  unknown,
  unknown
> = (req, res) => {
  res.json({ message: "This is a test API" });
};

interface updateUserControllerBody {
  username?: string;
  email?: string;
  password?: string;
  avatar?: string;
  tokenUserId: string;
}

export const updateUserController: RequestHandler<
  { id: string },
  unknown,
  updateUserControllerBody,
  unknown
> = async (req, res, next) => {
  const { id } = req.params;
  const { username, email, password, avatar, tokenUserId } = req.body;
  console.log({ username, email, password, avatar, tokenUserId, id });
  try {
    if (tokenUserId !== id) {
      return next(
        createHttpError(
          HTTP_STATUS_CODES.FORBIDDEN,
          HTTP_STATUS_MESSAGE.UNAUTHORIZED
        )
      );
    }
    if (password) {
      req.body.password = await bcrypt.hash(password, 10);
    }
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      {
        $set: {
          username,
          email,
          password,
          avatar,
        },
      },
      { new: true }
    );
    return res.status(HTTP_STATUS_CODES.OK).send({
      success: true,
      message: HTTP_STATUS_MESSAGE.OK,
      updatedUser: {
        ...updatedUser?.toObject(),
        password: undefined,
        __v: undefined,
      },
    });
  } catch (error) {
    next(error);
  }
};
