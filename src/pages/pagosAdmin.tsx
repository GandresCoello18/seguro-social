import React from "react";
import { NavBarAdmin } from "../components/admin/navbar";
import { CardPagos } from "../components/admin/card-pagos";
import { SearchPagos } from "../components/admin/searchPagos";

export function PagosAdmin() {
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
          <SearchPagos />
          <br />
          <div className="row">
            <CardPagos />
          </div>
        </div>
      </div>
    </>
  );
}
