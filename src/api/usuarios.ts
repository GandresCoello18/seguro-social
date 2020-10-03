import axios from "axios";
import { Usuario_INT } from "../interface";
import { DOMAIN } from "../config/domain";

export const create_count = async (data: Usuario_INT) => {
  return await axios({
    method: "POST",
    url: `${DOMAIN}/api/usuario`,
    data,
  });
};

export const obtener_usuarios = async () => {
  return await axios({
    method: "GET",
    url: `${DOMAIN}/api/usuario`,
  });
};
