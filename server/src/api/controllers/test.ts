import { Response, Request } from "express";

const test = async (req: Request, res: Response) => {
  const { user } = req;
  res.send(user);
};

export default test;
