import axios from "axios";
import { DOMAIN, TOKEN } from "../config/domain";
import { Cita_INT } from "../interface";

///// PETICIONES GET

export const obtenerCitas = async () => {
  return await axios({
    method: "GET",
    url: `${DOMAIN}/api/cita`,
  });
};

//// PETICION POST

export const crear_cita = async (data: Cita_INT) => {
  return await axios({
    method: "POST",
    url: `${DOMAIN}/api/cita`,
    data,
    headers: { "access-token": TOKEN },
  });
};

//// PETICION DELETE

export const eliminar_cita = async (id_cita: string) => {
  return await axios({
    method: "DELETE",
    url: `${DOMAIN}/api/cita/${id_cita}`,
    headers: { "access-token": TOKEN },
  });
};