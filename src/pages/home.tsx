import React from "react";
import { NavBar } from "../components/layout/navbar";
import { Portada } from "../components/header/portada";
import { Footer } from "../components/layout/fotter";
import { Testimonio } from "../components/client/testimonio";
import { TablesPersonal } from "../components/admin/tables-personal";

export function HomePage() {
  return (
    <>
      <NavBar title="Inicio" />
      <Portada />
      <br />
      <h2 className="text-center">Algunos Medicos</h2>
      <br />
      <TablesPersonal limit={4} />
      <br />
      <Testimonio />
      <Footer />
    </>
  );
}
