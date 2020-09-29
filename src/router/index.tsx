import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import { PublicRoute } from './public';
// import { PrivateRoute } from './private';
import { HomePage } from "../pages/home";
import { NotFound } from "../pages/not-found";
import { ContactoPage } from "../pages/contacto";

export default function Routes() {
  return (
    <Suspense fallback={<div />}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/contacto" component={ContactoPage} />
          <Route exact path="/404" component={NotFound} />
          <Route exact path="/" component={HomePage} />
          <Route exact component={NotFound} />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
}
