import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SpinnerLoader } from "../loader/spinner";
import { DOMAIN } from "../../config/domain";
import { RootState } from "../../redux";
import { Personal_IMT } from "../../interface";

interface Props {
  limit?: number;
}

export function TablesPersonal({ limit }: Props) {
  const [personales, setPersonal] = useState<Personal_IMT[]>([]);
  const PersonalReducer = useSelector(
    (state: RootState) => state.PersonalReducer
  );

  useEffect(() => {
    setPersonal(PersonalReducer.personal);
    if (!limit) {
      limit = PersonalReducer.personal.length;
    }
  }, [PersonalReducer, limit, personales]);

  return (
    <>
      {PersonalReducer.loading && <SpinnerLoader />}
      <div className="container-fluid">
        <div className="row justify-content-center">
          {personales.slice(0, limit).map((personal) => (
            <div
              className="col-12 col-md-4 col-lg-3 mt-2 mb-2"
              key={personal.id_personal}
            >
              <div className="single_candidates text-center">
                <div className="thumb">
                  <img
                    src={`${DOMAIN}/static/personal/${personal.imagen}`}
                    alt={personal.nombres + " " + personal.apellido}
                  />
                </div>
                <a href="/">
                  <h4>
                    {personal.nombres} {personal.apellido}
                  </h4>
                </a>
                <p>{personal.cargo}</p>
                <br />
                <button className="btn btn-info">Detalles</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
