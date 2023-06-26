import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {
  emailValidation,
  registrationRouter,
  usernameValidation,
} from "../api/routes/registration";
import connectToMongoDB from "../db/mongoDB";
import loginRouter from "../api/routes/login";
import testRouter from "../api/routes/test";

dotenv.config({ path: "../.env" });

const app = express();
const PORT: number = parseInt(process.env.PORT ?? "3000", 10);
const dbURL: string = process.env.DB_CONNECTION_URL || "";

app.use(express.json());
app.use(cors());
app.use("", registrationRouter);
app.use("", loginRouter);
app.use("", usernameValidation);
app.use("", emailValidation);
app.use("", testRouter);

connectToMongoDB(dbURL);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
