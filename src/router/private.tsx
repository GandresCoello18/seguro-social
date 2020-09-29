import React from "react";
import Cookie from "js-cookie";
import { Route, Redirect } from "react-router-dom";

interface Props {
  path: string;
  component: any;
}

export function PrivateRoute({ path, component, ...rest }: Props) {
  if (Cookie.get("access-token") === undefined) {
    return <Redirect to="/login/iniciar-session" />;
  }
  return <Route exact path={path} component={component} {...rest} />;
}
