import React from "react";
import { SpinnerLoader } from "../loader/spinner";
import { Badge, Button, Table } from "reactstrap";
import { Usuario_INT } from "../../interface";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";

interface Props {
  limit: number;
}

export function TablesUsuarios({ limit }: Props) {
  const UsuarioReducer = useSelector(
    (state: RootState) => state.UsuarioReducer
  );

  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            <Table striped bordered hover className="text-center">
              <thead>
                <tr>
                  <th>Cedula</th>
                  <th>Email</th>
                  <th>Estado</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {UsuarioReducer.loading && <SpinnerLoader />}
                {UsuarioReducer.usuarios
                  .slice(0, limit)
                  .map((user: Usuario_INT) => (
                    <tr key={user.id_user}>
                      <th>{user.cedula}</th>
                      <td>{user.email}</td>
                      <td>
                        <Badge
                          style={{ fontSize: 17 }}
                          color={
                            user.status === "registrado"
                              ? "secondary"
                              : "default"
                          }
                        >
                          {user.status}
                        </Badge>
                      </td>
                      <td>
                        <Button color="danger">Eliminar</Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
