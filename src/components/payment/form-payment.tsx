import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { DetallesPayment } from "./detalles-de-compra";
import { Pago_INT, ResponseAxios, Usuario_INT } from "../../interface";
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
import { RootState } from "../../redux";
import { fecha_actual, incrementarMes } from "../../hooks/fecha";
import moment from "moment";

interface Pago {
  metodo?: string;
  nombreCard: string;
  numeroCard: number;
  mesCard?: number;
  yearCard?: number;
  cvcNumber: number;
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

export function FormPayment() {
  const MisPagos: Array<Pago_INT> = useSelector(
    (state: RootState) => state.PagosReducer.MisPagos
  );
  const MyUser: Array<Usuario_INT> = useSelector(
    (state: RootState) => state.UsuarioReducer.myUser
  );

  const { control, errors, handleSubmit } = useForm<Pago>();
  const [mes, setMes] = useState<number>(0);
  const [ano, setAno] = useState<number>(0);
  const [isProximoPago, setIsProximoPago] = useState<boolean>(false);
  const [isFedback, setIsFedback] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [credito, setCredito] = useState<Pago>();
  const [fecha_pago, setFecha_pago] = useState<Date | number>(0);
  const [pagosAtrasado, setPagoAtrasado] = useState<number>(0);

  useEffect(() => {
    if (localStorage.getItem("credito")) {
      const jsonCredito: string | null | any = localStorage.getItem("credito");
      setCredito(JSON.parse(jsonCredito));
    }

    let date_pago;
    let thisMes: any;
    if (MisPagos.length === 0) {
      thisMes = MyUser[0].fecha_registro;
      date_pago = incrementarMes(thisMes);
      setFecha_pago(date_pago);
    } else {
      const ultimo_pago: string = MisPagos.reverse()[MisPagos.length - 1]
        .fecha_pago;
      thisMes = ultimo_pago;
      date_pago = incrementarMes(ultimo_pago);
      setFecha_pago(date_pago);
    }
    let meses_atrasos = moment(new Date(thisMes)).diff(
      moment(new Date(fecha_actual())),
      "months",
      true
    );
    setPagoAtrasado(Math.abs(meses_atrasos));
  }, [MisPagos, MyUser, incrementarMes]);

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

    try {
      const resPayment: ResponseAxios = await CreatePago(
        moment(new Date(fecha_pago)).format(),
        data.metodo,
        monto
      );

      if (resPayment.respuesta.type === "ERROR") {
        setIsFedback("danger");
        setFeedback(resPayment.respuesta.feeback);
      } else {
        setIsFedback("success");
        setFeedback(
          `Su pago de seguro fue registrada, pago para la fecha: ${moment(
            new Date(fecha_pago)
          ).format("LL")}, ver en la seccion de ( mis pagos )`
        );
      }
    } catch (error) {
      setIsFedback("danger");
      setFeedback(error.message);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(send)}>
        <h2>
          Pagar: <u>{moment(new Date(fecha_pago)).format("LL")}</u>
        </h2>
        <h2>
          Pagos atrasados:{" "}
          <Badge color={pagosAtrasado > 0 ? "danger" : "success"}>
            {pagosAtrasado?.toFixed()}
          </Badge>
        </h2>

        <div style={{ padding: 10 }}>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="metodo" defaultChecked={true} /> Tarjeta
              de credito
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="metodo" disabled={true} /> Paypal
            </Label>
          </FormGroup>
        </div>

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
        content={`Pago de seguro social por el mes  de ${"Enero"} del ${2020}`}
        monto={200}
      />
    </>
  );
}
