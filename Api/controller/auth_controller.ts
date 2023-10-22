import bcrypt from "bcrypt";
import crypto from "crypto";
import dotenv from "dotenv";
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { HTTP_STATUS_CODES, MESSAGES } from "../constants/codes-messages";
import { logger } from "../logger/logger";
import userModel from "../models/userModel";

// get config vars
dotenv.config();

interface SignUpBodyType {
  username?: string;
  email?: string;
  password?: string;
}

interface SignInBodyType {
  email?: string;
  password?: string;
}

export const SignUpController: RequestHandler<
  unknown,
  unknown,
  SignUpBodyType,
  unknown
> = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password)
      return next(createHttpError(400, MESSAGES.MISSING_PARAMETERS));
    const existingUser = await userModel.findOne({ email });
    if (existingUser) return next(createHttpError(409, MESSAGES.EMAIL_USED));
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.status(201).send({
      success: true,
      message: MESSAGES.SUCCESS_REGISTERED,
      user: { ...newUser.toObject(), password: undefined },
    });
  } catch (error) {
    next(error);
  }
};

export const SignInController: RequestHandler<
  unknown,
  unknown,
  SignInBodyType,
  unknown
> = async (req, res, next) => {
  const JWT_SECRET = process.env.JWT_SECRET!;
  const { email, password } = req.body;
  if (!email || !password)
    return next(createHttpError(400, MESSAGES.MISSING_PARAMETERS));
  try {
    const exitingUser = await userModel.findOne({ email });
    if (!exitingUser) return next(createHttpError(401, MESSAGES.FAILED_SIGNIN)); // to avoid brute force attack send a general message
    const isPassValid = await bcrypt.compare(password, exitingUser.password);
    if (!isPassValid) return next(createHttpError(401, MESSAGES.FAILED_SIGNIN)); // to avoid brute force attack send a general message
    const token = jwt.sign({ id: exitingUser._id }, JWT_SECRET);

    return res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .send({
        success: true,
        message: MESSAGES.SUCCESS_SIGNIN,
        user: {
          ...exitingUser.toObject(),
          password: undefined, //we don't want to send password to client side
          __v: undefined,
        },
      });
  } catch (error) {
    next(error);
  }
};
interface GoogleSignInControllerBodyType {
  name: string;
  email: string;
  photoUrl: string;
}

export const GoogleController: RequestHandler<
  unknown,
  unknown,
  GoogleSignInControllerBodyType,
  unknown
> = async (req, res, next) => {
  const { name, email, photoUrl } = req.body;
  const user = await userModel.findOne({ email });
  const JWT_SECRET = process.env.JWT_SECRET!;
  //if user Exists then simple log in with new token
  try {
    if (user) {
      const token = jwt.sign({ id: user._id }, JWT_SECRET);
      return res
        .status(HTTP_STATUS_CODES.OK)
        .cookie("access_token", token, { httpOnly: true })
        .send({
          success: true,
          message: MESSAGES.SUCCESS_SIGNIN,
          user: { ...user.toObject(), password: undefined, __v: undefined },
        });
    }
    //if user doesnt Exists then store in mongo db and return that user.
    else {
      const customPassword = crypto.randomBytes(16).toString("hex");
      const newUser = await userModel.create({
        username: name,
        email: email,
        password: customPassword,
        avatar: photoUrl,
      });
      const token = jwt.sign({ id: newUser._id }, JWT_SECRET);
      return res
        .status(HTTP_STATUS_CODES.CREATED)
        .cookie("access_token", token, { httpOnly: true })
        .send({
          success: true,
          message: MESSAGES.SUCCESS_SIGNIN,
          user: { ...newUser.toObject(), password: undefined, __v: undefined },
        });
    }
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
