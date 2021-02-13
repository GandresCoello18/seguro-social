import axios from "axios";
import { Usuario_INT } from "../interface";
import { DOMAIN, TOKEN } from "../config/domain";

/// Peticiones POST

export const create_count = async (data: Usuario_INT) => {
  return await axios({
    method: "POST",
    url: `${DOMAIN}/api/usuario`,
    data,
  });
};

/// PETICIONES GET

export const obtener_usuarios = async () => {
  return await axios({
    method: "GET",
    url: `${DOMAIN}/api/usuario`,
  });
};

//// PETICIONES PUT

export const update_password_user = async (
  id: string,
  password: string,
  newPassword: string
) => {
  return await axios({
    method: "PUT",
    url: `${DOMAIN}/api/usuario/cambiar_clave/${id}`,
    data: {
      password,
      newPassword,
    },
  });
};

export const update_password_admin_user = async (
  idUser: string,
  password: string
) => {
  return await axios({
    method: "PUT",
    url: `${DOMAIN}/api/usuario/cambiar_clave/admin`,
    data: {
      password,
      idUser,
    },
  });
};

//// PETICIONES DELETE

export const eliminar_usuarios = async (id: string) => {
  return await axios({
    method: "DELETE",
    url: `${DOMAIN}/api/usuario/${id}`,
    headers: { "access-token": TOKEN },
  });
};
