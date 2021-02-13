import React, { useEffect, useState } from "react";
import { FormPayment } from "../components/payment/form-payment";
import { NavBar } from "../components/layout/navbar";
import { ResumenPayment } from "../components/payment/resumen-payment";
import { Footer } from "../components/layout/fotter";
import { useSelector } from "react-redux";
import { Pago_INT, Usuario_INT } from "../interface";
import { RootState } from "../redux";
import { diferencia_de_meses, incrementarMes } from "../hooks/fecha";
import moment from "moment";

export function PaymentPage() {
  const MisPagos: Array<Pago_INT> = useSelector(
    (state: RootState) => state.PagosReducer.MisPagos
  );

  const MyUser: Array<Usuario_INT> = useSelector(
    (state: RootState) => state.UsuarioReducer.myUser
  );

  const [fecha_pago, setFecha_pago] = useState<Date | number>(0);
  const [pagosAtrasado, setPagoAtrasado] = useState<number | any>(0);

  useEffect(() => {
    let date_pago;
    let thisMes: any;
    if (MisPagos.length === 0) {
      thisMes = MyUser[0].fecha_registro;
      //date_pago = incrementarMes(thisMes);
      setFecha_pago(thisMes);
      localStorage.setItem("fecha-pago", thisMes);
    } else {
      const ultimo_pago: string = MisPagos.reverse()[MisPagos.length - 1]
        .fecha_pago;

      thisMes = ultimo_pago;

      date_pago = incrementarMes(ultimo_pago);

      setFecha_pago(date_pago);
      localStorage.setItem("fecha-pago", moment(new Date(date_pago)).format());
    }
    let meses_atrasos = diferencia_de_meses(thisMes);
    setPagoAtrasado(Math.trunc(Math.abs(meses_atrasos)));
  }, [MisPagos, MyUser]);

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
            <FormPayment
              fecha_pago={fecha_pago}
              pagosAtrasado={pagosAtrasado}
              MyUser={MyUser}
            />
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
