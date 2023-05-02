import { Request, Response } from "express";
import { IUser } from "../../types/auth";
import User from "../../db/models/user.schema";
import userValidationSchema from "../middlewares/authMiddlewares";

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password, confirmedPassword } = req.body;

    const { error } = userValidationSchema.validate({
      username,
      email,
      password,
    });
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    if (password !== confirmedPassword) {
      res
        .status(400)
        .json({ message: "Password does not match confirmed password" });
      return;
    }

    const user: IUser = new User({ username, email, password });
    await user.save();
    res.status(201).json({
      message: "User created successfully!",
      userData: { username, email, password },
    });
  } catch (error: any) {
    if (error.code === 11000) {
      const fieldName = Object.keys(error.keyPattern)[0];
      res.status(400).json({ message: `${fieldName} already exists` });
    } else {
      res.status(500).json({ message: "Error creating user", error });
    }
  }
};

export default createUser;
