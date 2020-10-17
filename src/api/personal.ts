import axios from "axios";
import { DOMAIN } from "../config/domain";

///// PETICIONES GET

export const obtenerPersonal = async () => {
  return await axios({
    method: "GET",
    url: `${DOMAIN}/api/personal`,
  });
};

/// PETICIONES POST

export const crearPersonal = async (data: FormData) => {
  return await axios({
    method: "POST",
    url: `${DOMAIN}/api/personal`,
    data,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

///  PETICION DELETE

export const DeletePersonal = async (id: number) => {
  return await axios({
    method: "DELETE",
    url: `${DOMAIN}/api/personal/${id}`,
  });
};
