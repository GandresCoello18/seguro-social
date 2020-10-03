import { AxiosResponse } from "axios";
import { Respuesta, Contacto_INT } from "../../interface";
import { crear_contacto } from "../contacto";

let respuesta: Respuesta = { feeback: "", type: "EXITO" };

export const CreateContacto = async (data: Contacto_INT) => {
  try {
    const axios: AxiosResponse = await crear_contacto(data);
    if (axios.data.feeback) {
      respuesta = { feeback: axios.data.feeback, type: "ERROR" };
    }

    return { axios, respuesta };
  } catch (error) {
    return error.message;
  }
};
