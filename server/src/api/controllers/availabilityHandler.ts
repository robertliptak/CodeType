import { Request, Response } from "express";
import User from "../../db/models/user.schema";

export const checkUsername = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user) {
      res.json({ available: false });
    } else {
      res.json({ available: true });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const checkEmail = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.json({ available: false });
    } else {
      res.json({ available: true });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
