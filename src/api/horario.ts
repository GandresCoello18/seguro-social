import axios from "axios";
import { DOMAIN, TOKEN } from "../config/domain";
import { Horario_INT } from "../interface";

///// PETICIONES GET

export const obtenerHorarios = async () => {
  return await axios({
    method: "GET",
    url: `${DOMAIN}/api/horario`,
  });
};

///// PETICION POST

export const crearteHorarios = async (data: Horario_INT) => {
  return await axios({
    method: "POST",
    url: `${DOMAIN}/api/horario`,
    data,
    headers: { "access-token": TOKEN },
  });
};

//// PETICION DELETE

export const DeleteHorarios = async (id_horario: string) => {
  return await axios({
    method: "DELETE",
    url: `${DOMAIN}/api/horario/${id_horario}`,
    headers: { "access-token": TOKEN },
  });
};
