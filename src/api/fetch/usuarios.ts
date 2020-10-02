import { AxiosResponse } from "axios";
import { Respuesta, Usuario_INT } from "../../interface";
import { create_count } from "../usuarios";

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

/*export const DeleteUser = async (id: number | string) => {
  try {
    const axios: AxiosResponse = await eliminarUser(id);
    if (axios.data.feeback) {
      respuesta = { feeback: axios.data.feeback, type: 'ERROR' };
    } else {
      if (axios.data.removed) {
        respuesta = { feeback: `EL USUARIO FUE ELIMINADO`, type: 'EXITO' };
      } else {
        respuesta = { feeback: `OCURRIO UN ERROR AL ELIMINAR EL USUARIO`, type: 'ERROR' };
      }
    }

    return { axios, respuesta };
  } catch (error) {
    return error.message;
  }
};
*/
