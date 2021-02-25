import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux";
import { CreatePagoModal } from "../components/admin/create-pago";
import { NavBarAdmin } from "../components/admin/navbar";
import { CardPagos } from "../components/admin/card-pagos";
import { SearchPagos } from "../components/admin/searchPagos";
import { Pago_INT } from "../interface";
import { obtenerPagosPorFecha } from "../api/pagos";
import { SpinnerLoader } from "../components/loader/spinner";
import { Alert, Badge, Button, Table } from "reactstrap";
import moment from "moment";
import { Link } from "react-router-dom";
import { ValidateStatusUser } from "../hooks/color-row-user";

export function PagosAdmin() {
  const PagosReducer = useSelector((state: RootState) => state.PagosReducer);
  const [pagos, setPagos] = useState<Array<Pago_INT>>([]);
  const [pagosPorFecha, setPagosPorFecha] = useState<Array<Pago_INT>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [fecha, setFecha] = useState<string>("");
  const [TypeFecha, setTypeFecha] = useState<string>("mes");

  useEffect(() => {
    if (PagosReducer.searchPago.length > 0) {
      setPagos(PagosReducer.searchPago);
    } else {
      setPagos(PagosReducer.pagos);
    }
  }, [PagosReducer]);

  useEffect(() => {
    console.log(fecha);
    fecha && setLoading(true);

    try {
      const fetchPago = async () => {
        const pagosFecha = await (await obtenerPagosPorFecha(fecha)).data;
        console.log(pagosFecha);
        setPagosPorFecha(pagosFecha);
        setLoading(false);
      };

      fecha && fetchPago();
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  }, [fecha]);

  return (
    <>
      <NavBarAdmin title="Personal" />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <div className="row justify-content-center">
        <div className="col-12 col-md-1">
          <h2 className="text-center text-right">Pagos:</h2>
        </div>
        <div className="col-12 col-md-1">
          <select
            className="form-control"
            onChange={(event) => setTypeFecha(event.target.value)}
          >
            <option value="mes">Mes</option>
            <option value="dia">Dia</option>
          </select>
        </div>
        <div className="col-12 col-md-2">
          {TypeFecha === "mes" ? (
            <input
              type="month"
              className="form-control"
              onChange={(event) => setFecha(event.target.value)}
              placeholder="Busca pagos por fechas"
            />
          ) : (
            <input
              type="date"
              className="form-control"
              onChange={(event) => setFecha(event.target.value)}
              placeholder="Busca pagos por fechas"
            />
          )}
        </div>
        {fecha && (
          <div className="col-12 col-md-1">
            <button className="btn btn-success" onClick={() => setFecha("")}>
              Ultimos pagos
            </button>
          </div>
        )}
      </div>

      <br />

      <div className="popular_catagory_area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section_title mb-40">
                {fecha ? (
                  <h3>
                    Monto recaudado:{" "}
                    <strong>
                      ${" "}
                      {pagosPorFecha.reduce(
                        (total, b) => total + Number(b.monto),
                        0
                      )}
                    </strong>
                  </h3>
                ) : (
                  <h3>Historial de pagos</h3>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-2">
              <CreatePagoModal />
            </div>
            <div className="col-10">
              <SearchPagos />
            </div>
          </div>
          <br />
          <div className="row">
            {loading && <SpinnerLoader />}
            {fecha && !loading ? (
              <>
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
                    {pagosPorFecha.map((pago: Pago_INT) => (
                      <tr key={pago.id_pago} className="bg-success">
                        <th>
                          <Link to={`/Details-Pagos/${pago.id_user}`}>
                            {pago.cedula}
                          </Link>
                        </th>
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
                          <Link to={`/factura/${pago.id_pago}`}>
                            <Button color="primary" className="mt-1 ml-2">
                              Factura
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                {pagosPorFecha.length === 0 && !loading && (
                  <Alert color="info">
                    Por el momento no existen datos para mostrar.
                  </Alert>
                )}
              </>
            ) : (
              <CardPagos pagos={pagos} limit={PagosReducer.pagos.length} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
