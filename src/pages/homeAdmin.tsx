import React from "react";
import { NavBarAdmin } from "../components/admin/navbar";
import { useSelector } from "react-redux";
import { RootState } from "../redux";
import { CardPagos } from "../components/admin/card-pagos";
import { TablesUsuarios } from "../components/admin/tables-usuarios";
import { TablesPersonal } from "../components/admin/tables-personal";

export function HomeAdmin() {
  const PagosReducer = useSelector((state: RootState) => state.PagosReducer);

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
            <CardPagos pagos={PagosReducer.pagos} limit={4} />
          </div>
        </div>
      </div>

      <br />
      <br />

      <h2 className="text-center">Ultimos Usuarios</h2>

      <br />

      <TablesUsuarios limit={4} />

      <br />

      <h2 className="text-center">Ultimos Personal</h2>

      <br />

      <TablesPersonal limit={4} />

      <br />
    </>
  );
}
