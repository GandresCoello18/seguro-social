import React from "react";
import { NavBarAdmin } from "../components/admin/navbar";
import { CreateHorarioFrom } from "../components/admin/create-horario";
import { TableHorario } from "../components/admin/table-horario";

export function HorarioPage() {
  return (
    <>
      <NavBarAdmin title="Horarios" />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <hr />
      <section className="container-fluid">
        <div className="row justify-content-lg-around">
          <div className="col-5">
            <TableHorario />
          </div>
          <div className="col-3">
            <CreateHorarioFrom />
          </div>
        </div>
      </section>
    </>
  );
}
