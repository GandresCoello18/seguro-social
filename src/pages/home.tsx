import React from "react";
import { NavBar } from "../components/layout/navbar";
import { Portada } from "../components/header/portada";
import { Footer } from "../components/layout/fotter";
import { Personal } from "../components/client/personal";
import { Companias } from "../components/client/companias";
import { Testimonio } from "../components/client/testimonio";

export function HomePage() {
  return (
    <>
      <NavBar title="Inicio" />
      <Portada />
      <br />
      <Personal />
      <br />
      <Companias />
      <br />
      <Testimonio />
      <Footer />
    </>
  );
}
