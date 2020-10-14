import React, { useEffect, useState } from "react";
import { DOMAIN } from "../config/domain";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Personal_IMT } from "../interface";
import { RootState } from "../redux";
import { SpinnerLoader } from "../components/loader/spinner";
import { NavBarAdmin } from "../components/admin/navbar";

interface Params {
  id_medico: string;
}

export function DetalleMedicoPage() {
  const params: Params = useParams();
  const history = useHistory<typeof useHistory>();
  const [detalleMedico, setDetalleMedico] = useState<Personal_IMT[]>([]);

  const Medicos: Array<Personal_IMT> = useSelector(
    (state: RootState) => state.PersonalReducer.personal
  );

  useEffect(() => {
    if (!params.id_medico) {
      history.push("/administracion");
    } else {
      setDetalleMedico(
        Medicos.filter(
          (state: Personal_IMT) =>
            String(state.id_personal) === params.id_medico
        )
      );
    }
  }, [history, Medicos, params]);

  return (
    <>
      <NavBarAdmin title="Detalles del Medico" />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {detalleMedico.length > 0 ? (
        <section
          className="container"
          style={{
            border: 1,
            borderStyle: "solid",
            borderColor: "#cdcdcd",
            padding: 6,
            marginTop: 6,
          }}
        >
          <div className="row justify-content-center">
            <div className="col-12 col-md-2">
              <img
                src={`${DOMAIN}/static/personal/${detalleMedico[0].imagen}`}
              />
            </div>
            <div className="col-12 col-md-5">
              <h1
                style={{
                  borderBottom: 3,
                  borderBottomColor: "royalblue",
                  borderBottomStyle: "solid",
                }}
              >
                {detalleMedico[0].nombres} {detalleMedico[0].apellido}
              </h1>
            </div>
          </div>

          <hr />

          <div className="row p-5 justify-content-md-center">
            <div className="col-12 col-md-4">
              <h2
                className="text-center"
                style={{
                  borderBottom: 3,
                  borderBottomColor: "royalblue",
                  borderBottomStyle: "solid",
                }}
              >
                Perfil
              </h2>
              <p className="p-2">
                Profecional puntual y responsable en todo sus tareas.
              </p>
            </div>
            <div className="col-12 col-md-4">
              <h2
                className="text-left"
                style={{
                  borderBottom: 3,
                  borderBottomColor: "royalblue",
                  borderBottomStyle: "solid",
                }}
              >
                Habilidades
              </h2>
              <p className="p-2">
                Cirugia y pediatria con mas de 6 años en el mercado de la
                medicina.
              </p>
            </div>
          </div>

          <div className="row p-5 justify-content-md-center">
            <div className="col-12 col-md-4">
              <h2
                className="text-center"
                style={{
                  borderBottom: 3,
                  borderBottomColor: "royalblue",
                  borderBottomStyle: "solid",
                }}
              >
                Contacto
              </h2>
              <ul>
                <li>Babahoyo 10 de agosto, centro.</li>
                <li>0992239138</li>
                <li>anonimo@gmail.com</li>
              </ul>
            </div>
            <div className="col-12 col-md-4">
              <h2
                className="text-left"
                style={{
                  borderBottom: 3,
                  borderBottomColor: "royalblue",
                  borderBottomStyle: "solid",
                }}
              >
                Experiencias
              </h2>
              <p className="p-2">Hospital martin icaza.</p>
              <ul>
                <li>Atencion en areas de emergencias</li>
                <li>Atencion en area de pediatria</li>
              </ul>
            </div>
          </div>

          <div className="row p-5 justify-content-md-center">
            <div className="col-12 col-md-4">
              <h2
                className="text-center"
                style={{
                  borderBottom: 3,
                  borderBottomColor: "royalblue",
                  borderBottomStyle: "solid",
                }}
              >
                Educacion
              </h2>
              <ul>
                <li>Universidad estatal de guayaquil.</li>
                <li>Universidad tecnica de babahoyo</li>
                <li>Maestria en ciencias y medicinas</li>
              </ul>
            </div>
            <div className="col-12 col-md-4">
              <h2
                className="text-left"
                style={{
                  borderBottom: 3,
                  borderBottomColor: "royalblue",
                  borderBottomStyle: "solid",
                }}
              >
                Recomendaciones
              </h2>
              <ul>
                <li>ING Carlos Tomala: 0984552145</li>
                <li>ABG Dario Santillan: 0944221114</li>
              </ul>
            </div>
          </div>
        </section>
      ) : (
        <SpinnerLoader />
      )}
    </>
  );
}
