import { AxiosResponse } from "axios";
import { Respuesta } from "../../interface";
import { createPagos } from "../pagos";

let respuesta: Respuesta = { feeback: "", type: "EXITO" };

export const CreatePago = async (
  fecha_pago: string | Date,
  metodo: string,
  monto: number
) => {
  try {
    const axios: AxiosResponse = await createPagos(fecha_pago, metodo, monto);
    if (axios.data.feeback) {
      respuesta = { feeback: axios.data.feeback, type: "ERROR" };
    }

    return { axios, respuesta };
  } catch (error) {
    return error.message;
  }
};
