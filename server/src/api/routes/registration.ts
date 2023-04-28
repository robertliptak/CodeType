import { Router } from "express";
import createUser from "../controllers/UserController";

const registrationRouter = Router();

registrationRouter.post("/registration", createUser);

export default registrationRouter;
