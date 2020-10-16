import { AxiosResponse } from "axios";
import { Respuesta, Usuario_INT } from "../../interface";
import {
  create_count,
  eliminar_usuarios,
  update_password_user,
} from "../usuarios";

let respuesta: Respuesta = { feeback: "", type: "EXITO" };

export const CreateCountUser = async (user: Usuario_INT) => {
  try {
    const axios: AxiosResponse = await create_count(user);
    if (axios.data.feeback) {
      respuesta = { feeback: axios.data.feeback, type: "ERROR" };
    }

    return { axios, respuesta };
  } catch (error) {
    return error.message;
  }
};

export const DeleteUser = async (id: string) => {
  try {
    const axios: AxiosResponse = await eliminar_usuarios(id);
    if (axios.data.feeback) {
      respuesta = { feeback: axios.data.feeback, type: "ERROR" };
    } else {
      if (axios.data.removed) {
        respuesta = { feeback: `EL USUARIO FUE ELIMINADO`, type: "EXITO" };
      } else {
        respuesta = {
          feeback: `OCURRIO UN ERROR AL ELIMINAR EL USUARIO`,
          type: "ERROR",
        };
      }
    }

    return { axios, respuesta };
  } catch (error) {
    return error.message;
  }
};

export const UpdateClaveUser = async (
  id: string,
  password: string,
  newPassword: string
) => {
  try {
    const axios: AxiosResponse = await update_password_user(
      id,
      password,
      newPassword
    );
    if (axios.data.feeback) {
      respuesta = { feeback: axios.data.feeback, type: "ERROR" };
    } else {
      if (axios.data.update) {
        respuesta = { feeback: `La clave fue modificada`, type: "EXITO" };
      } else {
        respuesta = {
          feeback: `Ocurrio un error al cambiar la clave`,
          type: "ERROR",
        };
      }
    }

    return { axios, respuesta };
  } catch (error) {
    return error.message;
  }
};
