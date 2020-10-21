import { Dispatch } from "redux";
import { obtenerPersonal } from "../../api/personal";
import { Personal_IMT } from "../../interface";

/// CONSTANTES

export interface initialData {
  personal: Array<Personal_IMT>;
  searchPersonal: Array<Personal_IMT>;
  loading: boolean;
  error: string;
}

const initialData: initialData = {
  personal: [],
  searchPersonal: [],
  loading: true,
  error: "",
};

const GET_PERSONAL = "GET_PERSONAL";
const SET_PERSONAL = "SET_PERSONAL";
const SET_SEARCH_PERSONAL = "SET_SEARCH_PERSONAL";

/// REDUCER

export default function reducer(state = initialData, action: any) {
  switch (action.type) {
    case GET_PERSONAL:
      return { ...state, personal: action.payload, loading: false };
    case SET_PERSONAL:
      return { ...state, personal: action.payload };
    case SET_SEARCH_PERSONAL:
      return { ...state, searchPersonal: action.payload };
    default:
      return state;
  }
}

/// ACTIONS

export const getPersonal = () => (dispatch: Dispatch) => {
  obtenerPersonal().then((res) => {
    dispatch({
      type: GET_PERSONAL,
      payload: res.data,
    });
  });
};

export const SetPersonal = (personal: Array<Personal_IMT>) => (
  dispatch: Dispatch
) => {
  dispatch({
    type: SET_PERSONAL,
    payload: personal,
  });
};

export const SetSearchPersonal = (personal: Array<Personal_IMT>) => (
  dispatch: Dispatch
) => {
  dispatch({
    type: SET_SEARCH_PERSONAL,
    payload: personal,
  });
};
