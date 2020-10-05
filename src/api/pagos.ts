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

///// PETICIONES POST

export const createPagos = async (
  fecha_pago: string | Date,
  metodo: string,
  monto: number,
  id_user?: string,
  admin?: boolean
) => {
  return await axios({
    method: "POST",
    url: `${DOMAIN}/api/pagos`,
    data: {
      fecha_pago,
      metodo,
      monto,
      id_user,
      admin,
    },
    headers: { "access-token": TOKEN },
  });
};

///// PETICION DELETE

export const deletePagos = async (id_pago: number) => {
  return await axios({
    method: "DELETE",
    url: `${DOMAIN}/api/pagos/${id_pago}`,
    headers: { "access-token": TOKEN },
  });
};
