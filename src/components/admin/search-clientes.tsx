import React, { useState } from "react";
import { Dispatch, RootState } from "../../redux";
import { useDispatch, useSelector } from "react-redux";
import { SetSearchUser } from "../../redux/modulos/usuarios";
import { Controller, useForm } from "react-hook-form";
import { Form, FormGroup, Input, Button, Alert } from "reactstrap";
import { Usuario_INT } from "../../interface";
import { SpinnerLoader } from "../loader/spinner";

interface Search {
  tipo: string;
  key: string;
}

export function SearchClientes() {
  const dispatch: Dispatch = useDispatch();
  const { control, handleSubmit } = useForm<Search>();
  const [isLoagin, setIsLoading] = useState<boolean>(false);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [tipo, setTipo] = useState<string>("cedula");

  const Usuario: Array<Usuario_INT> = useSelector(
    (state: RootState) => state.UsuarioReducer.usuarios
  );

  const send = (data: Search): void => {
    setIsLoading(true);
    setIsSearch(false);
    data.tipo = tipo;

    const search = Usuario.filter((user) => {
      switch (data.tipo) {
        case "cedula":
          return user.cedula.toString().indexOf(data.key) !== -1;
        case "nombres-apellidos":
          return (
            user.nombres?.indexOf(data.key) !== -1 ||
            user.apellidos?.indexOf(data.key) !== -1
          );
        case "email":
          return user.email.indexOf(data.key) !== -1;
      }
    });

    dispatch(SetSearchUser([...search]));

    setIsLoading(false);
    setIsSearch(true);

    setTimeout(() => {
      setIsSearch(false);
    }, 2000);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(send)}>
        <div className="row justify-content-center">
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
                    <option value="cedula">Cedula</option>
                    <option value="nombres-apellidos">
                      Nombres y Apellidos
                    </option>
                    <option value="email">Email</option>
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
          <div className="col-3">
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
