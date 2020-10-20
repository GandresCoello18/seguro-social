import React from "react";
import { Badge } from "reactstrap";

export function ResumenPayment() {
  return (
    <>
      <div
        style={{
          padding: 10,
          borderStyle: "solid",
          borderWidth: 5,
          borderColor: "#f8f8f9",
        }}
      >
        <h2>Resumen</h2>

        <br />

        <div
          className="row justify-content-md-between"
          style={{ backgroundColor: "#f8f8f9", padding: 15 }}
        >
          <div className="col-5">Precio original:</div>
          <div className="col-3">
            $ <Badge color="light">5 USA</Badge>
          </div>

          <div className="col-5">Descuento:</div>
          <div className="col-3">
            $ <Badge color="light">0 %</Badge>
          </div>
        </div>

        <hr />

        <div className="row justify-content-md-between" style={{ padding: 15 }}>
          <div className="col-5">
            <h4>Total:</h4>
          </div>
          <div className="col-3">
            $ <Badge color="light">5 USA</Badge>
          </div>

          <div className="col-12">
            <p>
              Seguro social está obligado por ley a recaudar los impuestos sobre
              las transacciones de las compras realizadas en determinadas
              jurisdicciones fiscales.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
