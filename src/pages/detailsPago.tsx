import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../redux";
import { Pago_INT, ResponseAxios } from "../interface";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { NavBarAdmin } from "../components/admin/navbar";
import { Badge, Button, Table } from "reactstrap";
import { DeletePago } from "../api/fetch/pagos";
import { SetPagos } from "../redux/modulos/pagos";
import { ValidateStatusUser } from "../hooks/color-row-user";
import { diferencia_de_meses, incrementarMes } from "../hooks/fecha";

interface Params {
  idUser: string;
}

export function DetailsPagoPage() {
  const [fecha_pago, setFecha_pago] = useState<Date | number>(0);
  const [pagosAtrasado, setPagoAtrasado] = useState<number | any>(0);
  const dispatch: Dispatch = useDispatch();
  const params: Params = useParams();
  const history = useHistory<typeof useHistory>();
  const [detallePago, setDetallePago] = useState<Pago_INT[]>([]);

  const PagosReducer = useSelector(
    (state: RootState) => state.PagosReducer.pagos
  );

  useEffect(() => {
    if (!params.idUser) {
      history.push("/");
    } else {
      const userPago = PagosReducer.filter(
        (state: Pago_INT) => String(state.id_user) === params.idUser
      );

      if (userPago.length) {
        setDetallePago(userPago);

        const ultimo_pago: string = userPago.reverse()[userPago.length - 1]
          .fecha_pago;
        const date_pago = incrementarMes(ultimo_pago);
        setFecha_pago(date_pago);

        let meses_atrasos = diferencia_de_meses(ultimo_pago);
        setPagoAtrasado(Math.trunc(Math.abs(meses_atrasos)));
      }
    }
  }, [params, PagosReducer, history]);

  const delete_pago = async (id_pago: number | undefined | any) => {
    const resDelete: ResponseAxios = await DeletePago(id_pago);

    if (resDelete.respuesta.type === "ERROR") {
      console.log(resDelete.respuesta.feeback);
    } else {
      const index: number = PagosReducer.findIndex(
        (item: { id_pago: any }) => item.id_pago === id_pago
      );
      PagosReducer.splice(index, 1);
      dispatch(SetPagos([...PagosReducer]));
    }
  };

  return (
    <>
      <NavBarAdmin title="Detalles de pagos" />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <h2 className="text-center">
        Afiliado:{" "}
        <strong>
          {detallePago.length
            ? detallePago[0].nombres + " " + detallePago[0].apellidos
            : "Cargando..."}
        </strong>
      </h2>
      <section className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10">
            <p style={{ fontSize: 20 }}>
              Siguiente Pago:{" "}
              <Badge color="warning">{moment(fecha_pago).format("LL")}</Badge>
            </p>
            <p style={{ fontSize: 20 }}>
              Pagos Atrasados:{" "}
              <Badge color={pagosAtrasado > 0 ? "danger" : "success"}>
                {pagosAtrasado}
              </Badge>
            </p>
            <p style={{ fontSize: 20 }}>
              Monto a pagar: <Badge>{pagosAtrasado * 5}</Badge>
            </p>
          </div>
          <div className="col-12 col-md-10">
            <Table striped bordered hover className="text-center">
              <thead>
                <tr>
                  <th>Cedula</th>
                  <th>Email</th>
                  <th>Fecha de pago</th>
                  <th>Metodo</th>
                  <th>Estado</th>
                  <th>Monto</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {detallePago.map((pago: Pago_INT) => (
                  <tr key={pago.id_pago} className="bg-success">
                    <th>{pago.cedula}</th>
                    <td>{pago.email}</td>
                    <td>{moment(pago.fecha_pago).format("LL")}</td>
                    <td>{pago.metodo}</td>
                    <td>
                      <Badge
                        style={{ fontSize: 17 }}
                        color={ValidateStatusUser(pago.status)}
                      >
                        {pago.status}
                      </Badge>
                    </td>
                    <td>${pago.monto}</td>
                    <td>
                      <Link to={`factura/${pago.id_pago}`} target="_blank">
                        <Button color="primary" className="mt-1 ml-2">
                          Factura
                        </Button>
                      </Link>
                      &nbsp; &nbsp;
                      <Button
                        color="danger"
                        onClick={() => delete_pago(pago.id_pago)}
                        className="mt-1"
                      >
                        Borrar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </section>
    </>
  );
}
