import { AxiosResponse } from "axios";
import { Respuesta, Cita_INT } from "../../interface";
import { crear_cita, eliminar_cita } from "../cita";

let respuesta: Respuesta = { feeback: "", type: "EXITO" };

export const CreateNewCita = async (data: Cita_INT) => {
  try {
    const axios: AxiosResponse = await crear_cita(data);
    if (axios.data.feeback) {
      respuesta = { feeback: axios.data.feeback, type: "ERROR" };
    } else {
      respuesta = { feeback: "", type: "EXITO" };
    }

    return { axios, respuesta };
  } catch (error) {
    return error.message;
  }
};

export const DeleteCita = async (id: string) => {
  try {
    const axios: AxiosResponse = await eliminar_cita(id);
    if (axios.data.feeback) {
      respuesta = { feeback: axios.data.feeback, type: "ERROR" };
    } else {
      if (axios.data.removed) {
        respuesta = { feeback: `LA CITA FUE ELIMINADO`, type: "EXITO" };
      } else {
        respuesta = {
          feeback: `OCURRIO UN ERROR AL ELIMINAR LA CITA`,
          type: "ERROR",
        };
      }
    }

    return { axios, respuesta };
  } catch (error) {
    return error.message;
  }
};
