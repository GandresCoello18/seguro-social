import { Dispatch } from "redux";
import { obtenerPagos, obtenerMisPagos } from "../../api/pagos";
import { Pago_INT } from "../../interface";

/// CONSTANTES

export interface initialData {
  pagos: Array<Pago_INT>;
  MisPagos: Array<Pago_INT>;
  loading: boolean;
  error: string;
}

const initialData: initialData = {
  pagos: [],
  MisPagos: [],
  loading: true,
  error: "",
};

const GET_PAGOS = "GET_PAGOS";
const GET_MIS_PAGOS = "GET_MIS_PAGOS";
const SET_PAGOS = "SET_PAGOS";
const SET_MIS_PAGOS = "SET_MIS_PAGOS";

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
