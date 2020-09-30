import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { DetallesPayment } from "./detalles-de-compra";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";

interface Pago {
  metodo: string;
  nombreCard: string;
  numeroCard: number;
  mesCard: number;
  yearCard: string;
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
  const { control, handleSubmit } = useForm<Pago>();
  const [mes, setMes] = useState<number>(0);

  const send = (data: Pago) => {
    console.log(data);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(send)}>
        <h2>Pagar</h2>

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
              as={Input}
              type="text"
              name="nombreCard"
              control={control}
              defaultValue=""
              placeholder="Nombre de la tarjeta"
            />
          </FormGroup>

          <FormGroup>
            <Controller
              as={Input}
              type="text"
              name="numeroCard"
              control={control}
              defaultValue=""
              placeholder="Numero de tarjeta"
            />
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
                        setMes(Number(e.target.value))
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
                  as={Input}
                  type="number"
                  name="cvcNumber"
                  control={control}
                  placeholder="CVC"
                />
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
              <Input type="checkbox" />
              Guardar datos para proximos pagos.
            </Label>
          </FormGroup>
        </div>
      </Form>

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
