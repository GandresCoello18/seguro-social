import { AxiosResponse } from "axios";
import { Horario_INT, Respuesta } from "../../interface";
import { crearteHorarios, DeleteHorarios } from "../horario";

let respuesta: Respuesta = { feeback: "", type: "EXITO" };

export const CreateHorario = async (data: Horario_INT) => {
  try {
    const axios: AxiosResponse = await crearteHorarios(data);
    if (axios.data.feeback) {
      respuesta = { feeback: axios.data.feeback, type: "ERROR" };
    }

    return { axios, respuesta };
  } catch (error) {
    return error.message;
  }
};

export const DeleteHorario = async (id: string) => {
  try {
    const axios: AxiosResponse = await DeleteHorarios(id);
    if (axios.data.feeback) {
      respuesta = { feeback: axios.data.feeback, type: "ERROR" };
    } else {
      if (axios.data.removed) {
        respuesta = { feeback: `EL HORARIO FUE ELIMINADO`, type: "EXITO" };
      } else {
        respuesta = {
          feeback: `OCURRIO UN ERROR AL ELIMINAR EL HORARIO`,
          type: "ERROR",
        };
      }
    }

    return { axios, respuesta };
  } catch (error) {
    return error.message;
  }
};
