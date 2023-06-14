import { Router } from "express";
import loginUser from "../controllers/loginUser";

const loginRouter = Router();

loginRouter.post("/login", loginUser);

export default loginRouter;
