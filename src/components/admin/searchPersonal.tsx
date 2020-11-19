import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormGroup, Input, Button, Alert } from "reactstrap";
import { Personal_IMT } from "../../interface";
import { Dispatch, RootState } from "../../redux";
import { SpinnerLoader } from "../loader/spinner";
import { SetSearchPersonal } from "../../redux/modulos/personal";

interface Search {
  tipo: string;
  key: string;
}

export function SearchPersonal() {
  const dispatch: Dispatch = useDispatch();
  const { control, handleSubmit } = useForm<Search>();
  const [tipo, setTipo] = useState<string>("cedula");
  const [isLoagin, setIsLoading] = useState<boolean>(false);
  const [isSearch, setIsSearch] = useState<boolean>(false);

  const Personal: Array<Personal_IMT> = useSelector(
    (state: RootState) => state.PersonalReducer.personal
  );

  const send = (data: Search): void => {
    setIsLoading(true);
    setIsSearch(false);
    data.tipo = tipo;

    const search = Personal.filter((personal) => {
      switch (data.tipo) {
        case "cedula":
          return personal.cedula_p.toString().indexOf(data.key) !== -1;
        case "nombres":
          return personal.nombres.indexOf(data.key) !== -1;
        case "apellido":
          return personal.apellido.indexOf(data.key) !== -1;
        case "cargo":
          return personal.cargo.indexOf(data.key) !== -1;
      }
    });

    dispatch(SetSearchPersonal([...search]));

    setIsLoading(false);
    setIsSearch(true);

    setTimeout(() => setIsSearch(false), 2000);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(send)}>
        <div className="row justify-content-center">
          <div className="col-4">
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
                    <option value="cedula">cedula</option>
                    <option value="nombres">nombre</option>
                    <option value="apellido">apellido</option>
                    <option value="cargo">cargo</option>
                  </Input>
                )}
              />
            </FormGroup>
          </div>
          <div className="col-4">
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
          <div className="col-4">
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
