import React from "react";
import { Table } from "reactstrap";

export function TablesUsuarios() {
  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Cedula</th>
                  <th>Email</th>
                  <th>Activo desde</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {[0, 1, 2, 3, 4, 5, 6].map((user) => (
                  <tr key={user}>
                    <th>1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
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
