import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import registrationRouter from "../api/routes/registration";
import connectToMongoDB from "../db/mongoDB";

dotenv.config({ path: "../.env" });

const app = express();
const PORT: number = parseInt(process.env.PORT ?? "3000", 10);
const dbURL: string = process.env.DB_CONNECTION_URL || "";

app.use(express.json());
app.use(cors());
app.use("", registrationRouter);

connectToMongoDB(dbURL);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
