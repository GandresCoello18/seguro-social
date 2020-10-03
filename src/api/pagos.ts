import axios from "axios";
import { DOMAIN, TOKEN } from "../config/domain";

///// PETICIONES GET

export const obtenerMisPagos = async () => {
  return await axios({
    method: "GET",
    url: `${DOMAIN}/api/pagos/mis-pagos`,
    headers: { "access-token": TOKEN },
  });
};

export const obtenerPagos = async () => {
  return await axios({
    method: "GET",
    url: `${DOMAIN}/api/pagos`,
  });
};
