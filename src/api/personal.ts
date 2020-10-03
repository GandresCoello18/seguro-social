import axios from "axios";
import { DOMAIN } from "../config/domain";

///// PETICIONES GET

export const obtenerPersonal = async () => {
  return await axios({
    method: "GET",
    url: `${DOMAIN}/api/personal`,
  });
};
