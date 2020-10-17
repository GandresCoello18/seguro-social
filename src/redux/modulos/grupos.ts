import { Dispatch } from "redux";
import { obtenerGrupos } from "../../api/grupo";
import { Grupo_afiliados_INT } from "../../interface";

/// CONSTANTES

export interface initialData {
  grupos: Array<Grupo_afiliados_INT>;
  loading: boolean;
  error: string;
}

const initialData: initialData = {
  grupos: [],
  loading: true,
  error: "",
};

const GET_GRUPOS = "GET_GRUPOS";
const SET_GRUPOS = "SET_GRUPOS";

/// REDUCER

export default function reducer(state = initialData, action: any) {
  switch (action.type) {
    case GET_GRUPOS:
      return { ...state, grupos: action.payload, loading: false };
    case SET_GRUPOS:
      return { ...state, grupos: action.payload };
    default:
      return state;
  }
}

/// ACTIONS

export const getGrupos = () => (dispatch: Dispatch) => {
  obtenerGrupos().then((res) => {
    dispatch({
      type: GET_GRUPOS,
      payload: res.data,
    });
  });
};

export const SetGrupos = (grupos: Array<Grupo_afiliados_INT>) => (
  dispatch: Dispatch
) => {
  dispatch({
    type: SET_GRUPOS,
    payload: grupos,
  });
};
