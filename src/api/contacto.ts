import axios from "axios";
import { DOMAIN } from "../config/domain";
import { Contacto_INT } from "../interface";

///// PETICIONES GET

export const crear_contacto = async (data: Contacto_INT) => {
  return await axios({
    method: "POST",
    url: `${DOMAIN}/api/contacto`,
    data,
  });
};
