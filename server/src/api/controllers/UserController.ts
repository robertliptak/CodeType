import { Request, Response } from "express";
import { IUser } from "../../types/auth";
import User from "../../db/models/user.schema";

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    const user: IUser = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

export default createUser;
