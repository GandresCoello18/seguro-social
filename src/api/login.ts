import axios from "axios";
import { DOMAIN } from "../config/domain";

export const LoginAccess = async (email: string, password: string) => {
  return await axios({
    method: "POST",
    url: `${DOMAIN}/api/login/autenticacion`,
    data: {
      email,
      password,
    },
  });
};

export const LifeToken = async (token: string) => {
  return await axios({
    method: "POST",
    url: `${DOMAIN}/api/login/vida-token`,
    headers: { "access-token": token },
  });
};
