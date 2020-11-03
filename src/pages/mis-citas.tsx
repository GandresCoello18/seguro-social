import React from "react";
import { NavBar } from "../components/layout/navbar";
import { useSelector } from "react-redux";
import { RootState } from "../redux";
import { SpinnerLoader } from "../components/loader/spinner";
import { CreateCita } from "../components/admin/create-cita";
import { Footer } from "../components/layout/fotter";
import { Alert, Badge, Table } from "reactstrap";
import moment from "moment";
import { Cita_INT } from "../interface";
import { EliminarCitaBtn } from "../components/admin/eliminar-cita";

export function MisCitas() {
  const MisCitas = useSelector((state: RootState) => state.CitasReducer);

  const validate_cita = (estado: string | undefined) => {
    switch (estado) {
      case "Reservado":
        return "bg-warning text-white";
      case "Atendido":
        return "bg-success";
      case "Cancelado":
        return "bg-danger";
    }
  };

  return (
    <>
      <NavBar title="Mis citas" />
      <div className="bradcam_area bradcam_bg_1">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="bradcam_text">
                <h3>Mis Citas</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="popular_catagory_area">
        <div className="container">
          <div className="row">
            <div className="col-8">
              <div className="section_title mb-40">
                <h3>Historial de mis citas</h3>
              </div>
            </div>
            <div className="col-2">
              <CreateCita isMisCitas={true} />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Table bordered hover className="text-center">
                <thead>
                  <tr>
                    <th>Estado</th>
                    <th>Email</th>
                    <th>Cedula</th>
                    <th>Medico</th>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Jornada</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {MisCitas.MisCitas.map((cita: Cita_INT) => (
                    <tr key={cita.id_cita}>
                      <th className={validate_cita(cita.status_cita)}>
                        {cita.status_cita}
                      </th>
                      <td>{cita.email}</td>
                      <td>{cita.cedula}</td>
                      <th style={{ color: "green" }}>
                        {cita.nombres} {cita.apellido}
                      </th>
                      <td>{moment(cita.fecha_cita).format("LL")}</td>
                      <td>
                        <Badge color="secondary" style={{ fontSize: 17 }}>
                          {cita.hora_cita}
                        </Badge>
                      </td>
                      <td>
                        <Badge color="secondary" style={{ fontSize: 17 }}>
                          {cita.jornada}
                        </Badge>
                      </td>
                      <td>
                        <EliminarCitaBtn
                          disable={cita.status_cita !== "Reservado"}
                          id_cita={cita.id_cita}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {MisCitas.MisCitas.length === 0 && (
                <Alert color="info">No tienes citas por el momneto</Alert>
              )}
              {MisCitas.loading && <SpinnerLoader />}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
