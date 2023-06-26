import { Router } from "express";
import test from "../controllers/test";
import verifyJWT from "../middlewares/verifyJWT";

const testRouter = Router();

testRouter.get("/test", verifyJWT, test);

export default testRouter;
