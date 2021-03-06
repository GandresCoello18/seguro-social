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

export interface Grupo_afiliados_INT {
  readonly id_grupo?: number;
  id_user: string;
  tipo_familiar: string;
  nombres: string;
  apellidos: string;
  sexo: string;
  fecha_nacimiento: string;
  status_grupo?: string;
  cedula_g: number;
}

export interface Personal_IMT {
  readonly id_personal?: number;
  nombres: string;
  apellido: string;
  cargo: string;
  imagen: string;
  cedula_p: number;
  telefono_p: number;
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
  nombres?: string;
  apellidos?: string;
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
  id_user?: string;
  email?: string;
  nombre_afiliado?: string;
  cedula?: number;
  status_cita?: string;
  fecha_cita: string;
  hora_cita: string;
  isGrupo: boolean | number;
  id_grupo?: number;
  id_personal?: number;
  jornada?: string;
  dia?: string;
  nombres?: string;
  apellido?: string;
  cargo?: string;
  imagen?: string;
}

export interface Cita_Grupo_INT {
  id_cita: string;
  id_horario: string;
  id_user: string;
  status_cita: string;
  fecha_cita: string;
  hora_cita: string;
  isGrupo: number;
  id_grupo: number;
  tipo_familiar: string;
  nombre_grupo_afiliado: string;
  apellidos: string;
  cedula_g: number;
  //fecha_nacimiento: string,
  status_grupo: string;
  sexo: string;
  id_personal: number;
  jornada: string;
  dia: string;
  nombres: string;
  apellido: string;
  cargo: string;
  imagen: string;
}
