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

export const createPagos = async (
  fecha_pago: string | Date,
  metodo: string,
  monto: number
) => {
  return await axios({
    method: "POST",
    url: `${DOMAIN}/api/pagos`,
    data: {
      fecha_pago,
      metodo,
      monto,
    },
    headers: { "access-token": TOKEN },
  });
};
