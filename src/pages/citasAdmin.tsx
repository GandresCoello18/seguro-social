import React, { useState } from "react";
import { TableCitas } from "../components/admin/table-citas";
import { CreateCita } from "../components/admin/create-cita";
import { NavBarAdmin } from "../components/admin/navbar";
import { TableCitasGrupos } from "../components/admin/table-cita-grupo";

export function CitasAdminPage() {
  const [search, setSearch] = useState<string>("");
  const [search_2, setSearch_2] = useState<string>("");

  return (
    <>
      <NavBarAdmin title="Agendar Citas" />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <hr />
      <h2 className="text-center p-2">Toda las citas de afiliados</h2>
      <section className="container-fluid mt-2">
        <div className="row justify-content-center">
          <div className="col-8">
            <CreateCita />
          </div>
          <div className="col-2">
            <input
              className="form-control"
              placeholder="Busca citas por cedula"
              type="text"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-12 mt-3">
            <TableCitas cedula={search} />
          </div>

          <hr />

          <h2 className="text-center p-2">
            Toda las citas de integrantes de los afiliados
          </h2>

          <div className="col-2">
            <input
              className="form-control"
              placeholder="Busca citas de integrantes por cedula"
              type="text"
              onChange={(e) => setSearch_2(e.target.value)}
            />
          </div>
          <div className="col-12 mt-3">
            <TableCitasGrupos cedula={search_2} />
          </div>
        </div>
      </section>
      <br />
    </>
  );
}
