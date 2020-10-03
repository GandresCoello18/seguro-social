import React from "react";
import Cookie from "js-cookie";
import { Route, Redirect } from "react-router-dom";

interface Props {
  path: string;
  component: any;
}

export function PublicRoute({ path, component, ...rest }: Props) {
  if (Cookie.get("isAdmin") === "true") {
    return <Redirect to="/administracion" />;
  }
  return <Route exact path={path} component={component} {...rest} />;
}
