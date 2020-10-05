import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux";
import { CreatePagoModal } from "../components/admin/create-pago";
import { NavBarAdmin } from "../components/admin/navbar";
import { CardPagos } from "../components/admin/card-pagos";
import { SearchPagos } from "../components/admin/searchPagos";

export function PagosAdmin() {
  const PagosReducer = useSelector((state: RootState) => state.PagosReducer);

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

      <h2 className="text-center">Pagos</h2>

      <br />

      <div className="popular_catagory_area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section_title mb-40">
                <h3>Historial de pagos</h3>
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
            <CardPagos
              pagos={PagosReducer.pagos}
              limit={PagosReducer.pagos.length}
            />
          </div>
        </div>
      </div>
    </>
  );
}
