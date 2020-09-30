import React from "react";
import { FormPayment } from "../components/payment/form-payment";
import { NavBar } from "../components/layout/navbar";
import { ResumenPayment } from "../components/payment/resumen-payment";
import { Footer } from "../components/layout/fotter";

export function PaymentPage() {
  return (
    <>
      <NavBar title="Pagar" />
      <div className="bradcam_area bradcam_bg_1">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="bradcam_text">
                <h3>Realizar pago</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="container-fluid">
        <div className="row justify-content-sm-around">
          <div className="col-12 col-md-5">
            <br />
            <FormPayment />
          </div>
          <div className="col-12 col-md-4">
            <br />
            <ResumenPayment />
          </div>
        </div>
      </section>

      <br />

      <Footer />
    </>
  );
}
