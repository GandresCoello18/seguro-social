import { AxiosResponse } from "axios";
import { Respuesta } from "../../interface";
import { crearPersonal, DeletePersonal } from "../personal";

let respuesta: Respuesta = { feeback: "", type: "EXITO" };

export const CreatePersona = async (personal: FormData) => {
  try {
    const axios: AxiosResponse = await crearPersonal(personal);
    if (axios.data.feeback) {
      respuesta = { feeback: axios.data.feeback, type: "ERROR" };
    }

    return { axios, respuesta };
  } catch (error) {
    return error.message;
  }
};

export const RemovePersonal = async (id: number) => {
  try {
    const axios: AxiosResponse = await DeletePersonal(id);
    if (axios.data.feeback) {
      respuesta = { feeback: axios.data.feeback, type: "ERROR" };
    } else {
      if (axios.data.removed) {
        respuesta = { feeback: `EL PERSONAL FUE ELIMINADO`, type: "EXITO" };
      } else {
        respuesta = {
          feeback: `OCURRIO UN ERROR AL ELIMINAR EL PERSONAL`,
          type: "ERROR",
        };
      }
    }

    return { axios, respuesta };
  } catch (error) {
    return error.message;
  }
};
