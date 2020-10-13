import { Dispatch } from "redux";
import { obtenerContacto } from "../../api/contacto";
import { Contacto_INT } from "../../interface";

/// CONSTANTES

export interface initialData {
  contacto: Array<Contacto_INT>;
  loading: boolean;
  error: string;
}

const initialData: initialData = {
  contacto: [],
  loading: true,
  error: "",
};

const GET_CONTACTOS = "GET_CONTACTOS";
const SET_CONTACTOS = "SET_CONTACTOS";

/// REDUCER

export default function reducer(state = initialData, action: any) {
  switch (action.type) {
    case GET_CONTACTOS:
      return { ...state, contacto: action.payload, loading: false };
    case SET_CONTACTOS:
      return { ...state, contacto: action.payload };
    default:
      return state;
  }
}

/// ACTIONS

export const getContactos = () => (dispatch: Dispatch) => {
  obtenerContacto().then((res) => {
    dispatch({
      type: GET_CONTACTOS,
      payload: res.data,
    });
  });
};

export const SetContactos = (contacto: Array<Contacto_INT>) => (
  dispatch: Dispatch
) => {
  dispatch({
    type: SET_CONTACTOS,
    payload: contacto,
  });
};
