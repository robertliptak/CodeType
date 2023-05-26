import axios from "./axios";
import { IRegistration, ILogin } from "../types/auth";

export const createUser = async (userData: IRegistration) => {
  try {
    const response = await axios.post("/registration", userData);
    return response.data;
  } catch (error) {
    console.log("From auth.ts in client api", error);
    return error;
  }
};

export const loginUser = async (userData: ILogin) => {
  try {
    const response = await axios.post("/login", userData);
    return response.data;
  } catch (error) {
    console.log("From auth.ts in client api", error);
    return error;
  }
};

export const checkUsername = async (username: string) => {
  try {
    const response = await axios.post("/check-username", { username });
    return response.data.available;
  } catch (error) {
    console.log("From auth.ts in client api", error);
    return error;
  }
};

export const checkEmail = async (email: string) => {
  try {
    const response = await axios.post("/check-email", { email });
    return response.data.available;
  } catch (error) {
    console.log("From auth.ts in client api", error);
    return error;
  }
};
