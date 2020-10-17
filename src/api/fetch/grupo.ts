import { AxiosResponse } from "axios";
import { Grupo_afiliados_INT, Respuesta } from "../../interface";
import { AgregarGrupo, eliminarGrupo } from "../grupo";

let respuesta: Respuesta = { feeback: "", type: "EXITO" };

export const IntegrarAlGrupo = async (data: Grupo_afiliados_INT) => {
  try {
    const axios: AxiosResponse = await AgregarGrupo(data);
    if (axios.data.feeback) {
      respuesta = { feeback: axios.data.feeback, type: "ERROR" };
    }

    return { axios, respuesta };
  } catch (error) {
    return error.message;
  }
};

export const DeleteGrupo = async (id: number) => {
  try {
    const axios: AxiosResponse = await eliminarGrupo(id);
    if (axios.data.feeback) {
      respuesta = { feeback: axios.data.feeback, type: "ERROR" };
    } else {
      if (axios.data.removed) {
        respuesta = { feeback: `EL INTEGRANTE FUE ELIMINADO`, type: "EXITO" };
      } else {
        respuesta = {
          feeback: `OCURRIO UN ERROR AL ELIMINAR EL INTEGRANTE`,
          type: "ERROR",
        };
      }
    }

    return { axios, respuesta };
  } catch (error) {
    return error.message;
  }
};
