import { Dispatch } from "redux";
import { obtenerCitasGrupo } from "../../api/cita";
import { Cita_Grupo_INT } from "../../interface";

/// CONSTANTES

export interface initialData {
  citasGrupo: Array<Cita_Grupo_INT>;
  loading: boolean;
  error: string;
}

const initialData: initialData = {
  citasGrupo: [],
  loading: true,
  error: "",
};

const GET_CITAS_GRUPO = "GET_CITAS_GRUPO";
const SET_CITAS_GRUPO = "SET_CITAS_GRUPO";

/// REDUCER

export default function reducer(state = initialData, action: any) {
  switch (action.type) {
    case GET_CITAS_GRUPO:
      return { ...state, citasGrupo: action.payload, loading: false };
    case SET_CITAS_GRUPO:
      return { ...state, citasGrupo: action.payload };
    default:
      return state;
  }
}

/// ACTIONS

export const getCitasGrupo = () => (dispatch: Dispatch) => {
  obtenerCitasGrupo().then((res) => {
    dispatch({
      type: GET_CITAS_GRUPO,
      payload: res.data,
    });
  });
};

export const SetCitasGrupo = (citas: Array<Cita_Grupo_INT>) => (
  dispatch: Dispatch
) => {
  dispatch({
    type: SET_CITAS_GRUPO,
    payload: citas,
  });
};
