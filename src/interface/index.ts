import { AxiosResponse } from "axios";

export interface Usuario_INT {
  readonly id_user: string;
  cedula: number;
  email: string;
  password: string;
  status: string;
  admin?: boolean;
  nombres: string;
  apellidos: string;
  sexo: string;
  fecha_nacimiento: string;
  fecha_registro?: string;
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
  nombres: string;
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
  cedula?: number;
  email?: string;
  admin?: boolean;
}

export interface Horario_INT {
  readonly id_horario: string;
  id_personal: number;
  jornada: string;
  dia: string;
  nombres?: string;
  apellido?: string;
  cargo?: string;
  imagen?: string;
}

export interface Cita_INT {
  readonly id_cita: string;
  id_horario: string;
  id_user: string;
  email?: string;
  cedula?: number;
  status_cita?: string;
  fecha_cita: string;
  hora_cita: string;
  id_personal?: number;
  jornada?: string;
  dia?: string;
  nombres?: string;
  apellido?: string;
  cargo?: string;
  imagen?: string;
}
