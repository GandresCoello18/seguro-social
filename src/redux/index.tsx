import Cookies from "js-cookie";
import { ResponseAxios } from "../interface";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import UsuarioReducer, { SetMyUser, getUsuarios } from "./modulos/usuarios";
import { TokenLife } from "../api/fetch/login";
import PersonalReducer, { getPersonal } from "./modulos/personal";
import PagosReducer, { getMisPagos, getPagos } from "./modulos/pagos";
import HorariosReducer, { getHorarios } from "./modulos/horarios";
import CitasReducer, { getCitas } from "./modulos/citas";
import ContactosReducer, { getContactos } from "./modulos/contactos";
import GruposReducer, { getGrupos } from "./modulos/grupos";

const rootReducer = combineReducers({
  UsuarioReducer,
  PersonalReducer,
  PagosReducer,
  HorariosReducer,
  CitasReducer,
  ContactosReducer,
  GruposReducer,
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  (window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose) || compose;

export default function generateStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

  getUsuarios()(store.dispatch);
  getPersonal()(store.dispatch);
  getPagos()(store.dispatch);
  getHorarios()(store.dispatch);
  getCitas()(store.dispatch);
  getContactos()(store.dispatch);
  getGrupos()(store.dispatch);

  if (Cookies.get("access-token") !== undefined) {
    getMisPagos()(store.dispatch);
    try {
      const lifeToken = async () => {
        const tokenLife: ResponseAxios = await TokenLife(
          Cookies.get("access-token")
        );

        if (tokenLife.respuesta.type === "ERROR") {
          console.log(tokenLife.respuesta.feeback);
        } else {
          SetMyUser(tokenLife.axios.data.myUser)(store.dispatch);
        }
      };

      lifeToken();
    } catch (error) {
      console.error(error.message + " error en getMyUser");
    }
  }

  return store;
}

const store = generateStore();
export type RootState = ReturnType<typeof rootReducer>;
export type Dispatch = typeof store.dispatch;
