import React from "react";
import { Link } from "react-router-dom";
import "./stylesPage/not-found.scss";

export function NotFound() {
  return (
    <>
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h3>Oops! Page not found</h3>
            <h1>
              <span>4</span>
              <span>0</span>
              <span>4</span>
            </h1>
          </div>
          <h2>Lo sentimos, lo que estas buscando no existe</h2>
          <Link to="/">Volver a un lugar seguro</Link>
        </div>
      </div>
    </>
  );
}
