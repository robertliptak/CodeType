import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
