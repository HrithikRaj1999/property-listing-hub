import mongoose, { Schema } from "mongoose";

interface UserType {
  username: string;
  email: string;
  password: string;
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
  },
  { timestamps: true }
);
export default mongoose.model<UserType>("User", userSchema);
