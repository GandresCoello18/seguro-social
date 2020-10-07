import React from "react";
import { useSelector } from "react-redux";
import { SpinnerLoader } from "../loader/spinner";
import { Badge, Alert, Table } from "reactstrap";
import { EliminarCitaBtn } from "./eliminar-cita";
import { Cita_INT } from "../../interface";
import { RootState } from "../../redux";
import moment from "moment";

export function TableCitas() {
  const CitasReducer = useSelector((state: RootState) => state.CitasReducer);

  return (
    <>
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
          {CitasReducer.loading && <SpinnerLoader />}
          {CitasReducer.citas.map((cita: Cita_INT) => (
            <tr key={cita.id_cita}>
              <th
                className={
                  cita.status_cita === "Reservado"
                    ? "bg-warning text-white"
                    : "bg-success"
                }
              >
                {cita.status_cita}
              </th>
              <td>{cita.email}</td>
              <td>{cita.cedula}</td>
              <th>
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
                <EliminarCitaBtn id_cita={cita.id_cita} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {CitasReducer.citas.length === 0 && (
        <Alert color="info">
          Por el momento no hay datos de citas para mostrar.
        </Alert>
      )}
    </>
  );
}
