import React from "react";
import { NavBarAdmin } from "../components/admin/navbar";
import { TableContacto } from "../components/admin/table-contacto";

export function ContactoAdminPage() {
  return (
    <>
      <NavBarAdmin title="Mensajes" />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <h2 className="text-center">Mensajes</h2>

      <section className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10">
            <TableContacto />
          </div>
        </div>
      </section>
    </>
  );
}
