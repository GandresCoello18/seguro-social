import { AxiosResponse } from "axios";

export interface Usuario_INT {
  readonly id_user: string;
  cedula: number;
  email: string;
  password: string;
  status: string;
  admin?: boolean;
}

export interface Personal_IMT {
  readonly id_personal?: number;
  nombres: string;
  apellido: string;
  cargo: string;
  imagen: string;
}

export interface Respuesta {
  feeback: string;
  type: string;
}

export interface ResponseAxios {
  axios: AxiosResponse;
  respuesta: Respuesta;
}

export interface Contacto_INT {
  readonly id_contacto?: number;
  mensaje: string;
  nombre: string;
  correo: string;
  tema: string;
}

export interface Pago_INT {
  readonly id_pago?: number;
  id_user: string;
  fecha_pago: string;
  status: string;
  metodo: string;
  monto: string;
}
