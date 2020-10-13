import React from "react";
import { Alert, Table } from "reactstrap";
import { useSelector } from "react-redux";
import { Contacto_INT } from "../../interface";
import { SpinnerLoader } from "../loader/spinner";
import { RootState } from "../../redux";
import { EliminarContactoBtn } from "./eliminar-contacto";

export function TableContacto() {
  const ContactoReducer = useSelector(
    (state: RootState) => state.ContactosReducer
  );

  return (
    <>
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Tema</th>
            <th>Mensaje</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {ContactoReducer.loading && <SpinnerLoader />}
          {ContactoReducer.contacto.map((user: Contacto_INT) => (
            <tr key={user.id_contacto}>
              <th>{user.nombres}</th>
              <td>{user.correo}</td>
              <td>{user.tema}</td>
              <td>{user.mensaje}</td>
              <td>
                <EliminarContactoBtn id_contacto={user.id_contacto} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <br />

      {ContactoReducer.contacto.length === 0 && (
        <Alert color="info">No existen datos en mensajes para mostrar.</Alert>
      )}
    </>
  );
}
