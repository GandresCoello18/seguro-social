import React from "react";
import { SpinnerLoader } from "../loader/spinner";
import { Alert, Badge, Table } from "reactstrap";
import moment from "moment";
import { EliminarUserBtn } from "./eliminar_user";
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
      {UsuarioReducer.myUser.length > 0 && (
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8">
              <Table striped bordered hover className="text-center">
                <thead>
                  <tr>
                    <th>Cedula</th>
                    <th>Nombres</th>
                    <th>Apellido</th>
                    <th>Email</th>
                    <th>Fecha nacimiento</th>
                    <th>Registrado en</th>
                    <th>Estado</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {UsuarioReducer.loading && <SpinnerLoader />}
                  {UsuarioReducer.usuarios
                    .filter(
                      (user: Usuario_INT) =>
                        user.id_user !== UsuarioReducer.myUser[0].id_user
                    )
                    .slice(0, limit)
                    .map((user: Usuario_INT) => (
                      <tr key={user.id_user}>
                        <th>{user.cedula}</th>
                        <th>{user.nombres}</th>
                        <th>{user.apellidos}</th>
                        <td>{user.email}</td>
                        <td>{moment(user.fecha_nacimiento).format("LL")}</td>
                        <td>{moment(user.fecha_registro).format("LL")}</td>
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
                          <EliminarUserBtn id_user={user.id_user} />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              {UsuarioReducer.usuarios.filter(
                (user: Usuario_INT) =>
                  user.id_user !== UsuarioReducer.myUser[0].id_user
              ).length === 0 && (
                <Alert color="info">
                  Por el momento no hay datos de usuario para mostrar.
                </Alert>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
