import express, { Request, Response } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config({ path: "../.env" });

const PORT: number = parseInt(process.env.PORT ?? "3000", 10);
const dbURL: string = process.env.DB_CONNECTION_URL || "";

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.listen(PORT, () => {
  console.log("Server started on port 3001");
});

const options: ConnectOptions & {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
} = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(dbURL, options)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));
