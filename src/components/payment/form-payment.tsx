import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { DetallesPayment } from "./detalles-de-compra";
import { ResponseAxios, Usuario_INT } from "../../interface";
import { CreatePago } from "../../api/fetch/pagos";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  FormFeedback,
  Alert,
  Badge,
} from "reactstrap";
import moment from "moment";
import { PayPalButton, OnCaptureData } from "react-paypal-button";

interface Pago {
  metodo?: string;
  nombreCard: string;
  numeroCard: number;
  mesCard?: number;
  yearCard?: number;
  cvcNumber: number;
}

interface Props {
  fecha_pago: any;
  pagosAtrasado: number;
  MyUser: Usuario_INT[];
}

const meses = [
  { id: 0, mes: "Enero" },
  { id: 1, mes: "Febrero" },
  { id: 2, mes: "Marzo" },
  { id: 3, mes: "Abril" },
  { id: 4, mes: "Mayo" },
  { id: 5, mes: "Junio" },
  { id: 6, mes: "Julio" },
  { id: 7, mes: "Agosto" },
  { id: 8, mes: "Septiembre" },
  { id: 9, mes: "Octubre" },
  { id: 10, mes: "Noviembre" },
  { id: 11, mes: "Diciembre" },
];

export function FormPayment({ fecha_pago, pagosAtrasado, MyUser }: Props) {
  const { control, errors, handleSubmit } = useForm<Pago>();
  const [mes, setMes] = useState<number>(0);
  const [ano, setAno] = useState<number>(0);
  const [isProximoPago, setIsProximoPago] = useState<boolean>(false);
  const [MetodoPago, setMetodoPago] = useState<string | any>("Paypal");
  const [isFedback, setIsFedback] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [credito] = useState<Pago>();

  const send = async (data: Pago) => {
    setIsFedback("");
    const { nombreCard, numeroCard, mesCard, yearCard, cvcNumber } = data;

    data.mesCard = mes;
    data.yearCard = ano;
    data.metodo = "Tarjeta de credito";

    if (isProximoPago) {
      const credito = {
        nombreCard,
        numeroCard,
        mesCard,
        yearCard,
        cvcNumber,
      };

      localStorage.setItem("credito", JSON.stringify(credito));
    }

    const monto = 5;

    await generatePago(data.metodo, monto);
  };

  const generatePago = async (metodo: string, monto: number) => {
    try {
      const resPayment: ResponseAxios = await CreatePago(
        moment(fecha_pago || localStorage.getItem("fecha-pago")).format(),
        metodo,
        monto,
        MyUser[0].id_user,
        true
      );

      if (resPayment.respuesta.type === "ERROR") {
        setIsFedback("danger");
        setFeedback(resPayment.respuesta.feeback);
      } else {
        setIsFedback("success");
        setFeedback(
          `Su pago de seguro fue registrada, pago para la fecha: ${moment(
            fecha_pago || localStorage.getItem("fecha-pago")
          ).format("LL")}, ver en la seccion de ( mis pagos )`
        );
      }
    } catch (error) {
      setIsFedback("danger");
      setFeedback(error.message);
    }
  };

  const PaymentPaypal = async (response: OnCaptureData) => {
    const purchase_unit = response.purchase_units[0] as any;
    const capture = purchase_unit.payments.captures[0];
    const paymentId = capture.id;
    await generatePago("Paypal", 5);
  };

  return (
    <>
      <h2>
        Registro:{" "}
        <u>{moment(MyUser.length && MyUser[0].fecha_registro).format("LL")}</u>
      </h2>
      <h2>
        Pagar: <u>{moment(fecha_pago).format("LL")}</u>
      </h2>
      <h2>
        Pagos atrasados:{" "}
        <Badge color={pagosAtrasado > 0 ? "danger" : "success"}>
          {pagosAtrasado}
        </Badge>
      </h2>

      <div style={{ padding: 10 }}>
        <FormGroup check>
          <Label check>
            <Input
              type="radio"
              name="metodo"
              onChange={(e) => setMetodoPago(e.target.value)}
              defaultChecked={true}
              checked={MetodoPago === "Tarjeta" ? true : false}
              value="Tarjeta"
            />{" "}
            Tarjeta de credito
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              type="radio"
              name="metodo"
              onChange={(e) => setMetodoPago(e.target.value)}
              checked={MetodoPago === "Paypal" ? true : false}
              value="Paypal"
            />{" "}
            Paypal
          </Label>
        </FormGroup>
      </div>
      {MetodoPago === "Tarjeta" ? (
        <>
          <Form onSubmit={handleSubmit(send)}>
            <div style={{ backgroundColor: "#f8f8f9", padding: 20 }}>
              <FormGroup>
                <Controller
                  as={
                    <Input
                      defaultValue={credito?.nombreCard}
                      invalid={errors.nombreCard ? true : false}
                    />
                  }
                  type="text"
                  name="nombreCard"
                  control={control}
                  rules={{ required: true }}
                  defaultValue={credito?.nombreCard}
                  placeholder="Nombre de la tarjeta"
                />
                <FormFeedback invalid={errors.nombreCard ? true : false}>
                  {errors.nombreCard && "Escribe el nombre de la tarjeta"}
                </FormFeedback>
              </FormGroup>

              <FormGroup>
                <Controller
                  as={<Input invalid={errors.numeroCard ? true : false} />}
                  type="number"
                  name="numeroCard"
                  control={control}
                  defaultValue={credito?.numeroCard}
                  rules={{ required: true }}
                  placeholder="Numero de tarjeta"
                />
                <FormFeedback invalid={errors.numeroCard ? true : false}>
                  {errors.numeroCard && "Escribe el numero de la tarjeta"}
                </FormFeedback>
              </FormGroup>

              <Label>Expireacion de tarjeta</Label>
              <div className="row justify-content-lg-around">
                <div className="col">
                  <FormGroup>
                    <Controller
                      name="mesCard"
                      type="select"
                      control={control}
                      render={({ name }) => (
                        <Input
                          name={name}
                          type="select"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setMes(Number(e.target.value))
                          }
                        >
                          {meses.map((mes) => (
                            <option value={mes.id}>{mes.mes}</option>
                          ))}
                        </Input>
                      )}
                    />
                  </FormGroup>
                </div>
                <div className="col">
                  <FormGroup>
                    <Controller
                      type="text"
                      name="yearCard"
                      control={control}
                      render={({ name }) => (
                        <Input
                          name={name}
                          type="select"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setAno(Number(e.target.value))
                          }
                        >
                          {[
                            1999,
                            2000,
                            2001,
                            2002,
                            2003,
                            2004,
                            2005,
                            2006,
                            2007,
                            2008,
                            2009,
                            2010,
                            2011,
                            2012,
                            2013,
                            2014,
                            2015,
                            2016,
                            2017,
                            2018,
                            2019,
                            2020,
                          ].map((ano) => (
                            <option value={ano}>{ano}</option>
                          ))}
                        </Input>
                      )}
                    />
                  </FormGroup>
                </div>
                <div className="col">
                  <FormGroup>
                    <Controller
                      as={<Input invalid={errors.cvcNumber ? true : false} />}
                      type="number"
                      name="cvcNumber"
                      control={control}
                      placeholder="CVC"
                      defaultValue={credito?.cvcNumber}
                      rules={{ required: true }}
                    />
                    <FormFeedback invalid={errors.cvcNumber ? true : false}>
                      {errors.cvcNumber && "CVC"}
                    </FormFeedback>
                  </FormGroup>
                </div>
              </div>

              <Button type="submit" color="danger" block>
                Realizar pago
              </Button>

              <br />
              <br />

              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    onChange={(e) => setIsProximoPago(e.target.checked)}
                  />
                  Guardar datos para proximos pagos.
                </Label>
              </FormGroup>
            </div>
          </Form>

          <br />

          {isFedback && <Alert color={isFedback}>{feedback}</Alert>}

          <br />
          <br />

          <DetallesPayment
            title="Detalles del pedido"
            content={`Pago de seguro social por el mes  de ${moment(
              fecha_pago
            ).format("LL")}`}
            monto={5}
          />
        </>
      ) : (
        <>
          <PayPalButton
            paypalOptions={{
              clientId:
                "ATlJBRTGGr5d9A4Q_FLgdCQlvJQIkzQc73hp4Nye9ESEdlpGwLQj-RWvjDEzyki31QUj40J84F2khBbl",
              intent: "capture",
              currency: "USD",
            }}
            buttonStyles={{
              layout: "vertical",
              shape: "rect",
            }}
            amount={5}
            onPaymentStart={() => console.log("payment")}
            onPaymentSuccess={async (response: OnCaptureData) =>
              await PaymentPaypal(response)
            }
            onPaymentError={(error: any) => console.log(error)}
            onPaymentCancel={(data: any) => console.log(data)}
          />
          <br />

          {isFedback && <Alert color={isFedback}>{feedback}</Alert>}
        </>
      )}
    </>
  );
}
