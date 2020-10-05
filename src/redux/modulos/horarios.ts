import { Dispatch } from "redux";
import { obtenerHorarios } from "../../api/horario";
import { Horario_INT } from "../../interface";

/// CONSTANTES

export interface initialData {
  horarios: Array<Horario_INT>;
  loading: boolean;
  error: string;
}

const initialData: initialData = {
  horarios: [],
  loading: true,
  error: "",
};

const GET_HORARIOS = "GET_HORARIOS";
const SET_HORARIOS = "SET_HORARIOS";

/// REDUCER

export default function reducer(state = initialData, action: any) {
  switch (action.type) {
    case GET_HORARIOS:
      return { ...state, horarios: action.payload, loading: false };
    case SET_HORARIOS:
      return { ...state, horarios: action.payload };
    default:
      return state;
  }
}

/// ACTIONS

export const getHorarios = () => (dispatch: Dispatch) => {
  obtenerHorarios().then((res) => {
    dispatch({
      type: GET_HORARIOS,
      payload: res.data,
    });
  });
};

export const SetHorarios = (horarios: Array<Horario_INT>) => (
  dispatch: Dispatch
) => {
  dispatch({
    type: SET_HORARIOS,
    payload: horarios,
  });
};
