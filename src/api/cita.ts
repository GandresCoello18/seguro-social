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

export const ValidarCitas = async (id_horario: string, fecha: string) => {
  return await axios({
    method: "GET",
    url: `${DOMAIN}/api/cita/validar_cita/${id_horario}/${fecha}`,
  });
};

export const obtenerCitasGrupo = async () => {
  return await axios({
    method: "GET",
    url: `${DOMAIN}/api/cita/cita_grupo`,
  });
};

export const obtenerMisCitas = async () => {
  return await axios({
    method: "GET",
    url: `${DOMAIN}/api/cita/mis-citas/consulta`,
    headers: { "access-token": TOKEN },
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

//// PETICION PUT

export const update_state_cita = async (id_cita: string, estado: string) => {
  return await axios({
    method: "PUT",
    url: `${DOMAIN}/api/cita/estado/${id_cita}`,
    data: {
      estado,
    },
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
