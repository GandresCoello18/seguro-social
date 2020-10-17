import { AxiosResponse } from "axios";
import { Respuesta, Contacto_INT } from "../../interface";
import {
  crear_contacto,
  eliminar_contacto,
  sendEmailcontacto,
} from "../contacto";

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

export const DeleteContacto = async (id: number) => {
  try {
    const axios: AxiosResponse = await eliminar_contacto(id);
    if (axios.data.feeback) {
      respuesta = { feeback: axios.data.feeback, type: "ERROR" };
    } else {
      if (axios.data.removed) {
        respuesta = { feeback: `EL MENSAJE FUE ELIMINADO`, type: "EXITO" };
      } else {
        respuesta = {
          feeback: `OCURRIO UN ERROR AL ELIMINAR EL MENSAJE`,
          type: "ERROR",
        };
      }
    }

    return { axios, respuesta };
  } catch (error) {
    return error.message;
  }
};

export const EnviarCorreo = async (correo: string, message: string) => {
  try {
    const axios: AxiosResponse = await sendEmailcontacto(correo, message);
    if (axios.data.send) {
      respuesta = { feeback: `EL MENSAJE FUE ENVIADO`, type: "EXITO" };
    } else {
      respuesta = {
        feeback: `OCURRIO UN ERROR AL ENVIAR EL MENSAJE`,
        type: "ERROR",
      };
    }

    return { axios, respuesta };
  } catch (error) {
    return error.message;
  }
};
