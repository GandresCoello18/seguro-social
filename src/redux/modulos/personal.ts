import { Dispatch } from "redux";

/// CONSTANTES

export interface initialData {
  myUser: Array<any>;
  loading: boolean;
  error: string;
}

const initialData: initialData = {
  myUser: [],
  loading: true,
  error: "",
};

const GET_MY_USER = "GET_MY_USER";

/// REDUCER

export default function reducer(state = initialData, action: any) {
  switch (action.type) {
    case GET_MY_USER:
      return { ...state, myUser: action.payload };
    default:
      return state;
  }
}

/// ACTIONS

export const getUsuarios = () => (dispatch: Dispatch) => {
  /*obtenerUsuarios().then(res => {
        dispatch({
            type: GET_USUARIOS,
            payload: res.data,
        });
    });*/
};
