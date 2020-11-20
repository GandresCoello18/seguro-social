import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { RootState, Dispatch } from "../../redux";
import { SetSearchPago } from "../../redux/modulos/pagos";
import { Form, FormGroup, Input, Button, Alert } from "reactstrap";
import { Pago_INT } from "../../interface";
import { SpinnerLoader } from "../loader/spinner";

interface Search {
  tipo: string;
  key: string;
}

export function SearchPagos() {
  const dispatch: Dispatch = useDispatch();
  const { control, handleSubmit } = useForm<Search>();
  const [tipo, setTipo] = useState<string>("metodo");
  const [isLoagin, setIsLoading] = useState<boolean>(false);
  const [isSearch, setIsSearch] = useState<boolean>(false);

  const Pagos: Array<Pago_INT> = useSelector(
    (state: RootState) => state.PagosReducer.pagos
  );

  const send = (data: Search) => {
    setIsLoading(true);
    setIsSearch(false);
    data.tipo = tipo;

    const search = Pagos.filter((pago) => {
      switch (data.tipo) {
        case "metodo":
          return pago.metodo.indexOf(data.key) !== -1;
        case "cliente":
          return (
            pago.nombres?.indexOf(data.key) !== -1 ||
            pago.apellidos?.indexOf(data.key) !== -1
          );
        case "fecha_pago":
          return pago.fecha_pago.indexOf(data.key) !== -1;
      }
    });

    dispatch(SetSearchPago([...search]));
    setIsLoading(false);
    setIsSearch(true);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(send)}>
        <div className="row justify-content-end">
          <div className="col-2">
            <FormGroup>
              <Controller
                name="tipo"
                type="select"
                control={control}
                render={({ name }) => (
                  <Input
                    name={name}
                    type="select"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setTipo(e.target.value)
                    }
                  >
                    <option value="metodo">Metodo</option>
                    <option value="cliente">Afiliado</option>
                    <option value="fecha_pago">Fecha Pago</option>
                  </Input>
                )}
              />
            </FormGroup>
          </div>
          <div className="col-2">
            <FormGroup>
              <Controller
                as={Input}
                type="text"
                name="key"
                control={control}
                defaultValue=""
                placeholder="Palabra clave..."
              />
            </FormGroup>
          </div>
          <div className="col-2">
            <Button type="submit" color="info" block>
              Buscar
            </Button>
          </div>
          <div className="col-2">{isLoagin && <SpinnerLoader />}</div>
        </div>
      </Form>

      <div className="row justify-content-center">
        <div className="col-4">
          {isSearch && <Alert color="info">Termino la busqueda.</Alert>}
        </div>
      </div>
    </>
  );
}
