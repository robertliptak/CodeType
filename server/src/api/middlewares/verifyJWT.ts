import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
}

declare module "express" {
  export interface Request {
    user?: UserPayload;
  }
}

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    // Handle verification failure here
    res.status(401).json({ auth: false, message: "Invalid or no token" });
    return;
  }

  const secretKey = process.env.JWT_ACCESS_TOKEN_KEY;
  if (!secretKey) {
    throw new Error("JWT secret key is not defined");
  }

  try {
    const payload = jwt.verify(token, secretKey) as UserPayload;
    req.user = payload;
    res.status(200).json({ auth: true, message: "Authenticated successfully" });
  } catch (error) {
    res.status(403).json({ auth: false, message: "Failed to authenticate" });
  }

  next();
};

export default verifyJWT;

// When I log in or I register, the access token is generated (I have already created primitive one) and refresh token is also created. The access token
// has short lifetime (15min) and the refresh token has longer lifetime (2weeks). Every time an authentication needed request is sent from front end, the
// access token is triggered and checked. If the token does not exist, the validity of refresh token is checked and new access token is created based on
// the validity.
//
// The access token might contain different data about logged user (my contain MongoDB id, which is assigned in loginUser in jwt.sign function. Whatever
// can be added to that object) which is then used to get data from backend based on which user is currently logged in.
//
// What to do now: 1. Add refresh token logic
//                 2. Add cookies
//                 3. Improve current logic of jwt, improve error handling and make the code cleaner
//                 4. Figure out how to render data on backend based on currently logged user (begin with second database to store tests)
