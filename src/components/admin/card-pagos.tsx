import React, { useEffect } from "react";
import moment from "moment";
import { Pago_INT } from "../../interface";
import { Badge } from "reactstrap";
import Cookies from "js-cookie";

interface Props {
  pagos: Array<Pago_INT>;
  limit: number;
}

export function CardPagos({ pagos, limit }: Props) {
  return (
    <>
      {pagos.slice(0, limit).map((pago) => (
        <div className="col-lg-4 col-xl-3 col-md-6" key={pago.id_pago}>
          <div className="single_catagory">
            {Cookies.get("access-token") && (
              <div className="text-center">
                <strong>Cliente: </strong>
                <Badge color="secondary">{pago.email}</Badge>
              </div>
            )}
            <br />
            <a href="jobs.html">
              <h4>
                Pago del seguro de la fecha:{" "}
                <strong>{moment(pago.fecha_pago).format("LL")}</strong>
              </h4>
            </a>
            <p>
              {" "}
              <span>$ {pago.monto}</span> {pago.metodo}
            </p>
            <br />
            <button className="btn btn-info form-control">Detalles</button>
          </div>
        </div>
      ))}
    </>
  );
}
