import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../../db/models/user.schema";

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
        .send({ errorMessage: "Cannot find user", email: true });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(400)
        .send({ errorMessage: "Invalid password", email: false });
    }

    // Password is correct, you can generate and send a JWT token here

    return res.status(200).send("Login successful");
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred during login (from login.ts)",
      error,
    });
  }
};

export default loginUser;
