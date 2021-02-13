import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { DeletePago } from "../../api/fetch/pagos";
import { useSelector, useDispatch } from "react-redux";
import { SetPagos } from "../../redux/modulos/pagos";
import { Pago_INT, ResponseAxios } from "../../interface";
import { Badge, Button, Alert } from "reactstrap";
import { RootState, Dispatch } from "../../redux";
import Cookies from "js-cookie";

interface Props {
  pagos: Array<Pago_INT>;
  limit: number;
}

export function CardPagos({ pagos, limit }: Props) {
  const dispatch: Dispatch = useDispatch();
  const PagosReducer: Array<Pago_INT> = useSelector(
    (state: RootState) => state.PagosReducer.pagos
  );
  const delete_pago = async (id_pago: number | undefined | any) => {
    const resDelete: ResponseAxios = await DeletePago(id_pago);

    if (resDelete.respuesta.type === "ERROR") {
      console.log(resDelete.respuesta.feeback);
    } else {
      const index: number = PagosReducer.findIndex(
        (item) => item.id_pago === id_pago
      );
      PagosReducer.splice(index, 1);
      dispatch(SetPagos([...PagosReducer]));
    }
  };

  return (
    <>
      {pagos.slice(0, limit).map((pago) => (
        <div className="col-lg-4 col-xl-3 col-md-6" key={pago.id_pago}>
          <div className="single_catagory">
            {Cookies.get("isAdmin") === "true" && (
              <Link to={`/Details-Pagos/${pago.id_user}`} target="_blank">
                <div className="text-center">
                  <strong>Afiliado: </strong>
                  <Badge color="secondary">{pago.email}</Badge>
                </div>
              </Link>
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
            <Link
              to={`/factura/${pago.id_pago}`}
              target="_blank"
              className="btn btn-info form-control"
            >
              Factura
            </Link>
            {Cookies.get("isAdmin") === "true" && (
              <Button
                color="danger"
                onClick={() => delete_pago(pago.id_pago)}
                className="mt-3"
                block
              >
                ELiminar
              </Button>
            )}
          </div>
        </div>
      ))}

      {pagos.length === 0 && (
        <Alert color="info">
          Por el momento no existen datos para mostrar.
        </Alert>
      )}
    </>
  );
}
