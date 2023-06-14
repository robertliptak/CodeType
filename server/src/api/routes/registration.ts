import { Router } from "express";
import createUser from "../controllers/createUser";
import { checkEmail, checkUsername } from "../controllers/availabilityHandler";

const registrationRouter = Router();
const usernameValidation = Router();
const emailValidation = Router();

registrationRouter.post("/registration", createUser);
usernameValidation.post("/check-username", checkUsername);
emailValidation.post("/check-email", checkEmail);

export { registrationRouter, usernameValidation, emailValidation };
