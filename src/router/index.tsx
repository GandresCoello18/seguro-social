import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { PublicRoute } from "./public";
import { PrivateRoute } from "./private";
import { HomePage } from "../pages/home";
import { NotFound } from "../pages/not-found";
import { MisPagos } from "../pages/mis-pagos";
import { ContactoPage } from "../pages/contacto";
import { MedicosPage } from "../pages/medicos";
import { PaymentPage } from "../pages/paymanet";
import { FacturaPage } from "../pages/factura";

//////////////  ADMINISTRACION

import { HomeAdmin } from "../pages/homeAdmin";
import { ClientesAdmin } from "../pages/clientesAdmin";
import { PersonalAdmin } from "../pages/personalAdmin";
import { PagosAdmin } from "../pages/pagosAdmin";
import { HorarioPage } from "../pages/horarioAdmin";
import { CitasAdminPage } from "../pages/citasAdmin";

export default function Routes() {
  return (
    <Suspense fallback={<div />}>
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/personal" component={PersonalAdmin} />
          <PrivateRoute path="/Pagos" component={PagosAdmin} />
          <PrivateRoute path="/administracion" component={HomeAdmin} />
          <PrivateRoute path="/horario" component={HorarioPage} />
          <PrivateRoute path="/citas" component={CitasAdminPage} />
          <PrivateRoute path="/clientes" component={ClientesAdmin} />
          <PublicRoute path="/medicos" component={MedicosPage} />
          <PublicRoute path="/contacto" component={ContactoPage} />
          <PrivateRoute path="/payment" component={PaymentPage} />
          <PrivateRoute path="/mis-pagos" component={MisPagos} />
          <Route path="/factura/:id_pago" component={FacturaPage} />
          <Route exact path="/404" component={NotFound} />
          <Route exact path="/" component={HomePage} />
          <Route exact component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}
