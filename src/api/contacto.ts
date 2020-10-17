import axios from "axios";
import { DOMAIN } from "../config/domain";
import { Contacto_INT } from "../interface";

///// PETICIONES GET

export const obtenerContacto = async () => {
  return await axios({
    method: "GET",
    url: `${DOMAIN}/api/contacto`,
  });
};

///// PETICIONES POST

export const crear_contacto = async (data: Contacto_INT) => {
  return await axios({
    method: "POST",
    url: `${DOMAIN}/api/contacto`,
    data,
  });
};

export const sendEmailcontacto = async (email: string, message: string) => {
  return await axios({
    method: "POST",
    url: `${DOMAIN}/api/contacto/send`,
    data: {
      email,
      message,
    },
  });
};

///// PETICIONES DELETE

export const eliminar_contacto = async (id_contacto: number) => {
  return await axios({
    method: "DELETE",
    url: `${DOMAIN}/api/contacto/${id_contacto}`,
  });
};
