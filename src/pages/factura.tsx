import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "../redux";
import { Pago_INT } from "../interface";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

interface Params {
  id_pago: string;
}

export function FacturaPage() {
  const params: Params = useParams();
  const history = useHistory<typeof useHistory>();
  const [detalleFact, setDetalleFact] = useState<Pago_INT[]>([]);

  const PagosReducer = useSelector((state: RootState) => state.PagosReducer);

  useEffect(() => {
    if (!params.id_pago) {
      history.push("/");
    } else {
      setDetalleFact(
        PagosReducer.pagos.filter(
          (state: Pago_INT) => String(state.id_pago) === params.id_pago
        )
      );
    }
  }, [params, PagosReducer, history]);

  return (
    <>
      {detalleFact.length > 0 && (
        <>
          <section
            className="container mt-5"
            style={{
              borderStyle: "solid",
              borderWidth: 2,
              borderColor: "#cdcdcd",
            }}
          >
            <div className="row justify-content-lg-between">
              <div className="col-12 col-md-5">
                <div className="logo">
                  <Link to="/">
                    <img src="../img/logo.png" alt="" />
                  </Link>
                </div>
                <ul>
                  <li>
                    Cedula: <strong>{detalleFact[0].cedula}</strong>
                  </li>
                  <li>
                    Email: <strong>{detalleFact[0].email}</strong>
                  </li>
                </ul>
              </div>
              <div className="col-12 col-md-5 text-center">
                <h2 className="p-2">Factura</h2>
                <ul>
                  <li>
                    Numero de factura:{" "}
                    <strong>
                      {Math.floor(Math.random() * (23350 - 1130)) + 1130}
                    </strong>
                  </li>
                  <li>
                    Fecha factura:{" "}
                    <strong>
                      {moment(detalleFact[0].fecha_pago).format("LL")}
                    </strong>
                  </li>
                </ul>

                <article
                  className="text-center"
                  style={{
                    borderStyle: "solid",
                    borderWidth: 2,
                    borderColor: "#cdcdcd",
                    width: 200,
                    position: "relative",
                    left: 120,
                  }}
                >
                  <h5>Monto</h5>
                  <strong>$ {detalleFact[0].monto}</strong>
                </article>
              </div>
            </div>
            <hr />
            <strong>La Teresa: </strong> <i>suportClementina@gmail.com</i>
            <br />
            <div
              className="row justify-content-md-center mt-3 text-center"
              style={{ backgroundColor: "#cdcdcd", color: "#000" }}
            >
              <div className="col-5">
                <h5>Descripcion</h5>
              </div>
              <div className="col-2">
                <h5>Cantidad</h5>
              </div>
              <div className="col-2">
                <h5>Precio</h5>
              </div>
              <div className="col-2">
                <h5>Total</h5>
              </div>
            </div>
            <div className="row justify-content-md-center text-center">
              <div className="col-5">
                <p>
                  Servicio de seguros social campesino "la teresa" pago de
                  seguros mensuales.
                </p>
              </div>
              <div className="col-2">
                <h4>1</h4>
              </div>
              <div className="col-2">
                <h4>$ {detalleFact[0].monto}</h4>
              </div>
              <div className="col-2">
                <h5>$ {detalleFact[0].monto}</h5>
              </div>
            </div>
            <hr />
            <div className="row justify-content-xl-around">
              <div className="col-5">
                <h4 className="p-1">Nota</h4>
                <p>
                  Este recibo justifica el pago electronico por medio de
                  plataforma de pago, guardar este recibo.
                </p>
              </div>
              <div className="col-5">
                <h4 className="p-1">Termino y condicion</h4>
                <p>Validos en reclamos antes de los 60 dias del pago.</p>
              </div>
            </div>
          </section>

          <section className="container">
            <div className="row mt-4">
              <div className="col-4">
                <button
                  className="btn btn-success"
                  onClick={() => window.print()}
                >
                  Guardar en pdf o imprimir
                </button>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
