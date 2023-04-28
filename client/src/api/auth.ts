import axios from "./axios";
import { IRegistration, ILogin } from "../types/auth";

export const createUser = async (
  userData: IRegistration,
): Promise<IRegistration> => {
  const response = await axios.post("/registration", userData);
  return response.data;
};

export const loginUser = async (userData: ILogin): Promise<ILogin> => {
  const response = await axios.post("/login", userData);
  return response.data;
};
