import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { SIGNUP } from "../constants/api_message";
import { customResponse } from "../constants/customResponse";
import userModel from "../models/userModel";
interface SignUpBodyType {
  username?: string;
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
      throw createHttpError(400, SIGNUP.MISSING_PARA);
    const existingUser = await userModel.findOne({ email });
    if (existingUser) throw createHttpError(409, SIGNUP.EMAIL_USED);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });
    return customResponse(res, 201, SIGNUP.SUCCESS, newUser);
  } catch (error) {
    next(error);
  }
};
