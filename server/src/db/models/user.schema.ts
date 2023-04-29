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
  created_at: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", function (next) {
  const currentDate = new Date();
  this.created_at = new Date(
    currentDate.getTime() - currentDate.getTimezoneOffset() * 60000,
  );
  next();
});

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
