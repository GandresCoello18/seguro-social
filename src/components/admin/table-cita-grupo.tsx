import React from "react";
import { useSelector } from "react-redux";
import { SpinnerLoader } from "../loader/spinner";
import { Badge, Alert, Table } from "reactstrap";
import { EliminarCitaBtn } from "./eliminar-cita";
import { Cita_Grupo_INT } from "../../interface";
import { RootState } from "../../redux";
import moment from "moment";
import { UpdateStatusCita } from "./update-status-cita";

export function TableCitasGrupos() {
  const CitasGrupoReducer = useSelector(
    (state: RootState) => state.CitaGrupoReducer
  );

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
      <Table bordered hover className="text-center">
        <thead>
          <tr>
            <th>Estado</th>
            <th>Integrante</th>
            <th>Tipo</th>
            <th>Medico</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Jornada</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {CitasGrupoReducer.citasGrupo.map((cita: Cita_Grupo_INT) => (
            <tr key={cita.id_cita}>
              <th className={validate_cita(cita.status_cita)}>
                {cita.status_cita}
              </th>
              <td>
                {cita.nombre_grupo_afiliado} {cita.apellidos}
              </td>
              <td>{cita.tipo_familiar}</td>
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
                <UpdateStatusCita
                  estado={cita.status_cita}
                  id_cita={cita.id_cita}
                />
                &nbsp; &nbsp;
                <EliminarCitaBtn id_cita={cita.id_cita} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {CitasGrupoReducer.loading && <SpinnerLoader />}
      {CitasGrupoReducer.citasGrupo.length === 0 && (
        <Alert color="info">
          Por el momento no hay datos de citas para mostrar.
        </Alert>
      )}
    </>
  );
}
