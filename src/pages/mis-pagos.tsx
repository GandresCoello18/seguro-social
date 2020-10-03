import React from "react";
import { NavBar } from "../components/layout/navbar";
import { useSelector } from "react-redux";
import { RootState } from "../redux";
import { SpinnerLoader } from "../components/loader/spinner";
import { CardPagos } from "../components/admin/card-pagos";
import { Footer } from "../components/layout/fotter";
import { Link } from "react-router-dom";

export function MisPagos() {
  const MisPagos = useSelector((state: RootState) => state.PagosReducer);

  return (
    <>
      <NavBar title="Mis pagos" />
      <div className="bradcam_area bradcam_bg_1">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="bradcam_text">
                <h3>Mis Pagos</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="popular_catagory_area">
        <div className="container">
          <div className="row">
            <div className="col-8">
              <div className="section_title mb-40">
                <h3>Historial de mis pagos</h3>
              </div>
            </div>
            <div className="col-2">
              <Link to="/payment">
                <button className="btn btn-success">Proximo pago</button>
              </Link>
            </div>
          </div>
          <div className="row">
            {MisPagos.loading_mis_pagos && <SpinnerLoader />}
            <CardPagos
              pagos={MisPagos.MisPagos}
              limit={MisPagos.MisPagos.length}
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
