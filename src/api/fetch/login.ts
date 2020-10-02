import { AxiosResponse } from "axios";
import { Respuesta } from "../../interface";
import { LoginAccess, LifeToken } from "../login";

let respuesta: Respuesta = { feeback: "", type: "EXITO" };

export const AccessLogin = async (email: string, password: string) => {
  try {
    const axios: AxiosResponse = await LoginAccess(email, password);
    if (axios.data.feeback) {
      respuesta = { feeback: axios.data.feeback, type: "ERROR" };
    }

    return { axios, respuesta };
  } catch (error) {
    return error.message;
  }
};

export const TokenLife = async (token: string | any) => {
  try {
    const axios: AxiosResponse = await LifeToken(token);
    if (axios.data.myUser === undefined) {
      respuesta = {
        feeback: "OCURRIO UN ERROR AL CONSEGUIR USUARIO LOGUEADO",
        type: "ERROR",
      };
    }

    return { axios, respuesta };
  } catch (error) {
    return error.message;
  }
};
