import mongoose, { Schema } from "mongoose";

interface UserType {
  username: string;
  email: string;
  password: string;
  avatar: string;
  token: string;
}
const userSchema = new Schema<UserType>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://media.istockphoto.com/id/1393750072/vector/flat-white-icon-man-for-web-design-silhouette-flat-illustration-vector-illustration-stock.jpg?s=612x612&w=0&k=20&c=s9hO4SpyvrDIfELozPpiB_WtzQV9KhoMUP9R9gVohoU=",
    },
    token: {
      type: String,
    },
  },
  { timestamps: true }
);
export const User = mongoose.model<UserType>("User", userSchema);
