import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import User from "../../db/models/user.schema";
import { generateAccessToken } from "./tokenHandler";

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const validEmail = isValidEmail(email);

  if (!validEmail) {
    return res.status(400).send({
      errorMessage: "Email should be a valid email address",
      email: true,
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ errorMessage: "Cannot find user", email: true });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(400)
        .json({ errorMessage: "Invalid password", email: false });
    }

    const userId = new ObjectId(user?.id);

    const accessToken = generateAccessToken(userId);

    return res.status(200).json({ accessToken, user });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred during login (from login.ts)",
      error,
    });
  }
};

export default loginUser;
