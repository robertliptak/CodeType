import axios from "./axios";
import { RegistrationData, LoginData } from "../types/auth";

export const createUser = async (
  userData: RegistrationData,
): Promise<RegistrationData> => {
  const response = await axios.post("/registration", userData);
  return response.data;
};

export const loginUser = async (userData: LoginData): Promise<LoginData> => {
  const response = await axios.post("/login", userData);
  return response.data;
};
