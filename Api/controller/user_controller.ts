import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import {
  HTTP_STATUS_CODES,
  HTTP_STATUS_MESSAGE,
  MESSAGES,
} from "../constants/codes-messages";
import { User } from "../models/userModel";

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

  try {
    if (tokenUserId !== id) {
      return next(
        createHttpError(
          HTTP_STATUS_CODES.FORBIDDEN,
          HTTP_STATUS_MESSAGE.UNAUTHORIZED
        )
      );
    }
    let hashedPassword = undefined;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          username,
          email,
          password: hashedPassword,
          avatar,
        },
      },
      { new: true }
    );
    return res.status(HTTP_STATUS_CODES.OK).send({
      success: true,
      message: HTTP_STATUS_MESSAGE.OK,
      user: {
        ...updatedUser?.toObject(),
        password: undefined,
        __v: undefined,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUserController: RequestHandler<
  { id: string },
  unknown,
  { tokenUserId: string },
  unknown
> = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { tokenUserId } = req.body;
    if (tokenUserId !== id)
      return next(
        createHttpError(
          HTTP_STATUS_CODES.UNAUTHORIZED,
          HTTP_STATUS_MESSAGE.UNAUTHORIZED
        )
      );
    await User.findByIdAndDelete(id);
    return res
      .status(HTTP_STATUS_CODES.OK)
      .send({ success: true, message: MESSAGES.SUCCESS_DELETE });
  } catch (error) {
    next(error);
  }
};
export const removeUserPicController: RequestHandler<
  { id: string },
  unknown,
  { avatar: string },
  unknown
> = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id)
      return next(
        createHttpError(HTTP_STATUS_CODES.NOT_FOUND, MESSAGES.WRONG_ID)
      );
    const { avatar } = req.body;
    if (!avatar)
      return next(
        createHttpError(HTTP_STATUS_CODES.NOT_FOUND, MESSAGES.FORBIDDEN)
      );

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { avatar },
      { new: true }
    );

    if (!updatedUser)
      return next(
        createHttpError(HTTP_STATUS_CODES.NOT_FOUND, MESSAGES.USER_NOT_FOUND)
      );
    return res.status(HTTP_STATUS_CODES.OK).send({
      success: true,
      message: MESSAGES.SUCCESS_UPDATE,
      user: {
        ...updatedUser.toObject(),
        password: undefined,
        __v: undefined,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserPicController: RequestHandler<
  { id: string },
  unknown,
  { avatar: string },
  unknown
> = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id)
      return next(
        createHttpError(HTTP_STATUS_CODES.NOT_FOUND, MESSAGES.WRONG_ID)
      );
    const { avatar } = req.body;
    if (!avatar)
      return next(
        createHttpError(HTTP_STATUS_CODES.NOT_FOUND, MESSAGES.FORBIDDEN)
      );
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { avatar },
      { new: true }
    );
    if (!updatedUser)
      return next(
        createHttpError(HTTP_STATUS_CODES.NOT_FOUND, MESSAGES.USER_NOT_FOUND)
      );
    return res.status(HTTP_STATUS_CODES.OK).send({
      success: true,
      message: MESSAGES.SUCCESS_UPDATE,
      user: {
        ...updatedUser.toObject(),
        password: undefined,
        __v: undefined,
      },
    });
  } catch (error) {
    next(error);
  }
};
