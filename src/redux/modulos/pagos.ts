import { Dispatch } from "redux";
import { obtenerPagos, obtenerMisPagos } from "../../api/pagos";
import { Pago_INT } from "../../interface";

/// CONSTANTES

export interface initialData {
  pagos: Array<Pago_INT>;
  searchPago: Array<Pago_INT>;
  MisPagos: Array<Pago_INT>;
  loading: boolean;
  loading_mis_pagos: boolean;
  error: string;
}

const initialData: initialData = {
  pagos: [],
  searchPago: [],
  MisPagos: [],
  loading: true,
  loading_mis_pagos: true,
  error: "",
};

const GET_PAGOS = "GET_PAGOS";
const GET_MIS_PAGOS = "GET_MIS_PAGOS";
const SET_PAGOS = "SET_PAGOS";
const SET_MIS_PAGOS = "SET_MIS_PAGOS";
const SEARCH_PAGO = "SEARCH_PAGO";

/// REDUCER

export default function reducer(state = initialData, action: any) {
  switch (action.type) {
    case GET_PAGOS:
      return { ...state, pagos: action.payload, loading: false };
    case GET_MIS_PAGOS:
      return { ...state, MisPagos: action.payload, loading_mis_pagos: false };
    case SET_PAGOS:
      return { ...state, pagos: action.payload };
    case SET_MIS_PAGOS:
      return { ...state, MisPagos: action.payload };
    case SEARCH_PAGO:
      return { ...state, searchPago: action.payload };
    default:
      return state;
  }
}

/// ACTIONS

export const getPagos = () => (dispatch: Dispatch) => {
  obtenerPagos().then((res) => {
    dispatch({
      type: GET_PAGOS,
      payload: res.data,
    });
  });
};

export const getMisPagos = () => (dispatch: Dispatch) => {
  obtenerMisPagos().then((res) => {
    dispatch({
      type: GET_MIS_PAGOS,
      payload: res.data,
    });
  });
};

export const SetPagos = (pago: Array<Pago_INT>) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_PAGOS,
    payload: pago,
  });
};

export const SetMisPagos = (pago: Array<Pago_INT>) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_MIS_PAGOS,
    payload: pago,
  });
};

export const SetSearchPago = (pago: Array<Pago_INT>) => (
  dispatch: Dispatch
) => {
  dispatch({
    type: SEARCH_PAGO,
    payload: pago,
  });
};
