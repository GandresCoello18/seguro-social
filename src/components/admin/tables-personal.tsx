import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SpinnerLoader } from "../loader/spinner";
import { DOMAIN } from "../../config/domain";
import { RootState } from "../../redux";
import { Personal_IMT } from "../../interface";
import { Link } from "react-router-dom";
import { EliminarPersonalBtn } from "../admin/eliminar-personal";
import Cookies from "js-cookie";

interface Props {
  limit?: number;
}

export function TablesPersonal({ limit }: Props) {
  const [personales, setPersonal] = useState<Personal_IMT[]>([]);
  const PersonalReducer = useSelector(
    (state: RootState) => state.PersonalReducer
  );

  useEffect(() => {
    if (PersonalReducer.searchPersonal.length > 0) {
      setPersonal(PersonalReducer.searchPersonal);
    } else {
      setPersonal(PersonalReducer.personal);
    }
  }, [PersonalReducer, personales]);

  return (
    <>
      {PersonalReducer.loading && <SpinnerLoader />}
      <div className="container-fluid">
        <div className="row justify-content-center">
          {personales.slice(0, limit).map((personal) => (
            <div
              className="col-12 col-md-4 col-lg-3 mt-3 mb-3"
              key={personal.id_personal}
            >
              <div className="single_candidates text-center">
                <div className="thumb">
                  <img
                    src={`${DOMAIN}/static/personal/${personal.imagen}`}
                    alt={personal.nombres + " " + personal.apellido}
                    style={{ maxWidth: 130 }}
                  />
                </div>
                <a href="/">
                  <h4>
                    {personal.nombres} {personal.apellido}
                  </h4>
                </a>
                <p>{personal.cargo}</p>
                <br />
                <Link to={`medico-detalle/${personal.id_personal}`}>
                  <button className="btn btn-info">Detalles</button>
                </Link>
                &nbsp;
                {Cookies.get("isAdmin") === "true" && (
                  <EliminarPersonalBtn id_personal={personal.id_personal} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
