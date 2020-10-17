import axios from "axios";
import { DOMAIN } from "../config/domain";
import { Grupo_afiliados_INT } from "../interface";

///// PETICIONES GET

export const obtenerGrupos = async () => {
  return await axios({
    method: "GET",
    url: `${DOMAIN}/api/grupo`,
  });
};

///// PETICION POST

export const AgregarGrupo = async (data: Grupo_afiliados_INT) => {
  return await axios({
    method: "POST",
    url: `${DOMAIN}/api/grupo`,
    data,
  });
};

//// PETICION DELETE

export const eliminarGrupo = async (id_grupo: number) => {
  return await axios({
    method: "DELETE",
    url: `${DOMAIN}/api/grupo/${id_grupo}`,
  });
};
