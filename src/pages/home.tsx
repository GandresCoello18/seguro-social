import React from "react";
import { NavBar } from "../components/layout/navbar";
import { Portada } from "../components/header/portada";
import { Footer } from "../components/layout/fotter";
import { Personal } from "../components/client/personal";
import { Companias } from "../components/client/companias";
import { Testimonio } from "../components/client/testimonio";
import { TablesPersonal } from "../components/admin/tables-personal";

export function HomePage() {
  return (
    <>
      <NavBar title="Inicio" />
      <Portada />
      <br />
      <TablesPersonal limit={4} />
      <br />
      <Companias />
      <br />
      <Testimonio />
      <Footer />
    </>
  );
}
