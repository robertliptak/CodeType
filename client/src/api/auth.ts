import axios from "axios";
import { RegisterData } from "../types/auth";

const createUser = async (userData: RegisterData): Promise<RegisterData> => {
  const response = await axios.post("http://localhost:3001/register", userData);
  return response.data;
};

export default createUser;
