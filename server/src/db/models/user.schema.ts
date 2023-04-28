import mongoose, { Model, Schema } from "mongoose";
import { IUser } from "../../types/auth";

const userSchema: Schema<IUser> = new mongoose.Schema({
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
});

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
