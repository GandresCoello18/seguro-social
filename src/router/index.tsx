import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import { PublicRoute } from './public';
// import { PrivateRoute } from './private';
import { HomePage } from "../pages/home";
import { NotFound } from "../pages/not-found";
import { MisPagos } from "../pages/mis-pagos";
import { ContactoPage } from "../pages/contacto";
import { MedicosPage } from "../pages/medicos";
import { PaymentPage } from "../pages/paymanet";

//////////////  ADMINISTRACION

import { HomeAdmin } from "../pages/homeAdmin";
import { ClientesAdmin } from "../pages/clientesAdmin";
import { PersonalAdmin } from "../pages/personalAdmin";
import { PagosAdmin } from "../pages/pagosAdmin";

export default function Routes() {
  return (
    <Suspense fallback={<div />}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/personal" component={PersonalAdmin} />
          <Route exact path="/Pagos" component={PagosAdmin} />
          <Route exact path="/administracion" component={HomeAdmin} />
          <Route exact path="/clientes" component={ClientesAdmin} />
          <Route exact path="/medicos" component={MedicosPage} />
          <Route exact path="/contacto" component={ContactoPage} />
          <Route exact path="/payment" component={PaymentPage} />
          <Route exact path="/mis-pagos" component={MisPagos} />
          <Route exact path="/404" component={NotFound} />
          <Route exact path="/" component={HomePage} />
          <Route exact component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}
