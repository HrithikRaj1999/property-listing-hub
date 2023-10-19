import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { SIGNUP, SIGN_IN } from "../constants/api_message";
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
      return next(createHttpError(400, SIGNUP.MISSING_PARA));
    const existingUser = await userModel.findOne({ email });
    if (existingUser) return next(createHttpError(409, SIGNUP.EMAIL_USED));
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });
    return res
      .status(201)
      .send({ success: true, message: SIGNUP.SUCCESS, newUser });
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
    return next(createHttpError(400, SIGNUP.MISSING_PARA));
  try {
    const exitingUser = await userModel.findOne({ email });
    if (!exitingUser) return next(createHttpError(401, SIGN_IN.FAILED)); // to avoid brute force attack
    const isPassValid = await bcrypt.compare(password, exitingUser.password);
    if (!isPassValid) return next(createHttpError(401, SIGN_IN.FAILED)); // to avoid brute force attack
    const token = jwt.sign({ id: exitingUser._id }, JWT_SECRET);
    return res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .send({ success: true, message: SIGN_IN.SUCCESS });
  } catch (error) {
    next(error);
  }
};
