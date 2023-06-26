import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export const generateAccessToken = (userId: ObjectId) => {
  const accessTokenKey = process.env.JWT_ACCESS_TOKEN_KEY;
  if (!accessTokenKey) {
    throw new Error("JWT access token key is not defined");
  }

  return jwt.sign({ userId }, accessTokenKey, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (userId: ObjectId) => {
  const refreshTokenKey = process.env.JWT_REFRESH_TOKEN_KEY;
  if (!refreshTokenKey) {
    throw new Error("JWT refresh token key is not defined");
  }

  return jwt.sign({ userId }, refreshTokenKey, {
    expiresIn: "2weeks",
  });
};
