import { AxiosResponse } from "axios";

export interface Usuario_INT {
  readonly id_user: string;
  cedula: number;
  email: string;
  password: string;
  status: string;
}

export interface Respuesta {
  feeback: string;
  type: string;
}

export interface ResponseAxios {
  axios: AxiosResponse;
  respuesta: Respuesta;
}
