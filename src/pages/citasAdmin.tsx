import React from "react";
import { TableCitas } from "../components/admin/table-citas";
import { CreateCita } from "../components/admin/create-cita";
import { NavBarAdmin } from "../components/admin/navbar";
import { TableCitasGrupos } from "../components/admin/table-cita-grupo";

export function CitasAdminPage() {
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
          <div className="col-12 mt-3">
            <TableCitas />
          </div>
          <div className="col-12 mt-3">
            <h2 className="text-center p-2">Toda las citas de afiliados</h2>
            <TableCitasGrupos />
          </div>
        </div>
      </section>
      <br />
    </>
  );
}
