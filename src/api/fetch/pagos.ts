import { AxiosResponse } from "axios";
import { Respuesta } from "../../interface";
import { createPagos, deletePagos } from "../pagos";

let respuesta: Respuesta = { feeback: "", type: "EXITO" };

export const CreatePago = async (
  fecha_pago: string | Date,
  metodo: string,
  monto: number,
  id_user?: string,
  admin?: boolean
) => {
  try {
    const axios: AxiosResponse = await createPagos(
      fecha_pago,
      metodo,
      monto,
      id_user,
      admin
    );
    if (axios.data.feeback) {
      respuesta = { feeback: axios.data.feeback, type: "ERROR" };
    }

    return { axios, respuesta };
  } catch (error) {
    return error.message;
  }
};

export const DeletePago = async (id: number) => {
  try {
    const axios: AxiosResponse = await deletePagos(id);
    if (axios.data.feeback) {
      respuesta = { feeback: axios.data.feeback, type: "ERROR" };
    } else {
      if (axios.data.removed) {
        respuesta = { feeback: `EL PAGO FUE ELIMINADO`, type: "EXITO" };
      } else {
        respuesta = {
          feeback: `OCURRIO UN ERROR AL ELIMINAR EL PAGO`,
          type: "ERROR",
        };
      }
    }

    return { axios, respuesta };
  } catch (error) {
    return error.message;
  }
};
