import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const app = express();
const PORT: number = parseInt(process.env.PORT ?? "3000", 10);
const dbURL: string = process.env.DB_CONNECTION_URL || "";

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
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

app.post("/register", (req, res) => {
  const userData = req.body;
  res.json({ message: "Data received successfully", userData });
});
