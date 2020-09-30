import React from "react";
import { NavBarAdmin } from "../components/admin/navbar";
import { CardPagos } from "../components/admin/card-pagos";
import { TablesUsuarios } from "../components/admin/tables-usuarios";
import { TablesPersonal } from "../components/admin/tables-personal";

export function HomeAdmin() {
  return (
    <>
      <NavBarAdmin title="Administracion" />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <h2 className="text-center">Pagos Recientes</h2>

      <div className="popular_catagory_area">
        <div className="container">
          <div className="row">
            <CardPagos />
          </div>
        </div>
      </div>

      <br />
      <br />

      <h2 className="text-center">Ultimos Usuarios</h2>

      <br />

      <TablesUsuarios />

      <br />

      <h2 className="text-center">Ultimos Personal</h2>

      <br />

      <TablesPersonal />

      <br />
    </>
  );
}
