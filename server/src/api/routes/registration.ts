import { Router } from "express";
import createUser from "../controllers/UserController";
import {
  checkEmail,
  checkUsername,
} from "../controllers/RegistrationValidationController";

export const registrationRouter = Router();
export const usernameValidation = Router();
export const emailValidation = Router();

registrationRouter.post("/registration", createUser);
usernameValidation.post("/check-username", checkUsername);
emailValidation.post("/check-email", checkEmail);
