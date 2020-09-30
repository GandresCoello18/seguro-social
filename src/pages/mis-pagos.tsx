import React from "react";
import { NavBar } from "../components/layout/navbar";
import { Footer } from "../components/layout/fotter";

export function MisPagos() {
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
            <div className="col-lg-12">
              <div className="section_title mb-40">
                <h3>Historial de mis pagos</h3>
              </div>
            </div>
          </div>
          <div className="row">
            {[0, 1, 2, 3, 4, 5, 6].map((pago) => (
              <div className="col-lg-4 col-xl-3 col-md-6" key={pago}>
                <div className="single_catagory">
                  <a href="jobs.html">
                    <h4>Design & Creative</h4>
                  </a>
                  <p>
                    {" "}
                    <span>50</span> Available position
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
