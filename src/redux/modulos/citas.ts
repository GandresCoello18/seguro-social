import { Dispatch } from "redux";
import { obtenerCitas, obtenerMisCitas } from "../../api/cita";
import { Cita_Grupo_INT, Cita_INT } from "../../interface";

/// CONSTANTES

export interface initialData {
  citas: Array<Cita_INT>;
  MisCitas: Array<Cita_INT>;
  MisCitasGrupo: Array<Cita_Grupo_INT>;
  loading: boolean;
  error: string;
}

const initialData: initialData = {
  citas: [],
  MisCitas: [],
  MisCitasGrupo: [],
  loading: true,
  error: "",
};

const GET_CITAS = "GET_CITAS";
const SET_CITAS = "SET_CITAS";
const GET_MIS_CITAS = "GET_MIS_CITAS";
const SET_MIS_CITAS = "SET_MIS_CITAS";
const GET_MIS_CITAS_GRUPO = "GET_MIS_CITAS_GRUPO";
const SET_MIS_CITAS_GRUPO = "SET_MIS_CITAS_GRUPO";

/// REDUCER

export default function reducer(state = initialData, action: any) {
  switch (action.type) {
    case GET_CITAS:
      return { ...state, citas: action.payload, loading: false };
    case SET_CITAS:
      return { ...state, citas: action.payload };
    case GET_MIS_CITAS:
      return { ...state, MisCitas: action.payload, loading: false };
    case SET_MIS_CITAS:
      return { ...state, MisCitas: action.payload };
    case GET_MIS_CITAS_GRUPO:
      return { ...state, MisCitasGrupo: action.payload, loading: false };
    case SET_MIS_CITAS_GRUPO:
      return { ...state, MisCitasGrupo: action.payload };
    default:
      return state;
  }
}

/// ACTIONS

export const getCitas = () => (dispatch: Dispatch) => {
  obtenerCitas().then((res) => {
    dispatch({
      type: GET_CITAS,
      payload: res.data,
    });
  });
};

export const SetCitas = (citas: Array<Cita_INT>) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_CITAS,
    payload: citas,
  });
};

//////  MIS CITAS

export const getMisCitas = () => (dispatch: Dispatch) => {
  obtenerMisCitas().then((res) => {
    dispatch({
      type: GET_MIS_CITAS,
      payload: res.data.MisCitas,
    });

    dispatch({
      type: GET_MIS_CITAS_GRUPO,
      payload: res.data.MisCitasGrupo,
    });
  });
};

export const SetMisCitas = (citas: Array<Cita_INT>) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_MIS_CITAS,
    payload: citas,
  });
};

/*  //////  MIS CITAS GRUPOS

export const getMisCitasGrupo = () => (dispatch: Dispatch) => {
  obtenerMisCitas().then((res) => {
    dispatch({
      type: GET_MIS_CITAS,
      payload: res.data[1],
    });
  });
};

export const SetMisCitasGrupo = (citasGrupo: Array<Cita_Grupo_INT>) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_MIS_CITAS,
    payload: citasGrupo,
  });
};*/
