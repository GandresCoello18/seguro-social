import { Dispatch } from "redux";
import { obtener_usuarios } from "../../api/usuarios";
import { Usuario_INT } from "../../interface";

/// CONSTANTES

export interface initialData {
  myUser: Array<Usuario_INT>;
  searchUser: Array<Usuario_INT>;
  usuarios: Array<Usuario_INT>;
  loading: boolean;
  error: string;
}

const initialData: initialData = {
  myUser: [],
  searchUser: [],
  usuarios: [],
  loading: true,
  error: "",
};

const GET_MY_USER = "GET_MY_USER";
const SET_MY_USER = "SET_MY_USER";
const GET_USUARIOS = "GET_USUARIOS";
const SET_USUARIOS = "SET_USUARIOS";
const SET_SEARCH_USER = "SET_SEARCH_USER";

/// REDUCER

export default function reducer(state = initialData, action: any) {
  switch (action.type) {
    case GET_MY_USER:
      return { ...state, myUser: action.payload };
    case GET_USUARIOS:
      return { ...state, usuarios: action.payload, loading: false };
    case SET_USUARIOS:
      return { ...state, usuarios: action.payload };
    case SET_MY_USER:
      return { ...state, myUser: action.payload };
    case SET_SEARCH_USER:
      return { ...state, searchUser: action.payload };
    default:
      return state;
  }
}

/// ACTIONS

export const getUsuarios = () => (dispatch: Dispatch) => {
  obtener_usuarios().then((res) => {
    dispatch({
      type: GET_USUARIOS,
      payload: res.data,
    });
  });
};

export const SetUsuarios = (usuarios: Array<Usuario_INT>) => (
  dispatch: Dispatch
) => {
  dispatch({
    type: SET_USUARIOS,
    payload: usuarios,
  });
};

export const SetMyUser = (usuarios: Array<Usuario_INT>) => (
  dispatch: Dispatch
) => {
  dispatch({
    type: SET_MY_USER,
    payload: usuarios,
  });
};

export const SetSearchUser = (usuarios: Array<Usuario_INT>) => (
  dispatch: Dispatch
) => {
  dispatch({
    type: SET_SEARCH_USER,
    payload: usuarios,
  });
};
