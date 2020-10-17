import React from "react";
import { NavBarAdmin } from "../components/admin/navbar";
import { SearchClientes } from "../components/admin/search-clientes";
import { CreateCLient } from "../components/admin/create-cliente";
import { TablesUsuarios } from "../components/admin/tables-usuarios";

export function ClientesAdmin() {
  return (
    <>
      <NavBarAdmin title="Clientes" />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <h2 className="text-center">Todos los Afiliados</h2>

      <br />

      <section className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-md-5">
            <SearchClientes />
          </div>
          <div className="col-12 col-md-3">
            <CreateCLient />
          </div>
          <div className="col-12 text-center">
            <TablesUsuarios limit={50} />
          </div>
        </div>
      </section>
    </>
  );
}
