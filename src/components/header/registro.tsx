import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { CreateCountUser } from "../../api/fetch/usuarios";
import { ResponseAxios, Usuario_INT } from "../../interface";
import { SpinnerLoader } from "../loader/spinner";
import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";

interface Registro {
  cedula: number;
  email: string;
  password: string;
  confir_password: string;
}

export function RegistroForm() {
  const { handleSubmit, control, errors } = useForm<Registro>();
  const [feedback, setFeedback] = useState<string>("");
  const [isFeeedback, setIsFeedback] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: Registro) => {
    setIsFeedback("");
    setIsLoading(true);

    const { cedula, confir_password, email, password } = data;

    try {
      if (password !== confir_password) {
        setIsFeedback("danger");
        setFeedback("Las contraseñas no son iguales");
      } else {
        const user: Usuario_INT = {
          id_user: "",
          cedula,
          email,
          password,
          status: "",
        };

        const CreateUser: ResponseAxios = await CreateCountUser(user);

        if (CreateUser.respuesta.type === "ERROR") {
          setIsFeedback("danger");
          setFeedback(CreateUser.respuesta.feeback);
        } else {
          setIsFeedback("success");
          setFeedback("Se creo el usuario correctamente");
        }
      }
      setIsLoading(false);
    } catch (error) {
      setIsFeedback("danger");
      setFeedback(error.message);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="email">Cedula:</Label>
          <Controller
            as={Input}
            type="number"
            name="cedula"
            control={control}
            defaultValue=""
            placeholder="Ingresa tu numero de cedula"
          />
        </FormGroup>

        <FormGroup>
          <Label for="email">Email:</Label>
          <Controller
            as={Input}
            type="email"
            name="email"
            control={control}
            defaultValue=""
            placeholder="Ingresa tu email"
          />
        </FormGroup>

        <FormGroup>
          <Label for="password">contraseña:</Label>
          <Controller
            as={Input}
            type="password"
            name="password"
            control={control}
            defaultValue=""
            placeholder="Ingresa una clave con 7 o mas caracteres"
          />
        </FormGroup>

        <FormGroup>
          <Label for="password">confir contraseña:</Label>
          <Controller
            as={Input}
            type="password"
            name="confir_password"
            control={control}
            defaultValue=""
            placeholder="Vuelve ha escribir la contraseña"
          />
        </FormGroup>

        <Button type="submit" color="primary" block>
          Registrarme
        </Button>
      </Form>
      <br />
      <div style={{ textAlign: "center" }}>
        {isLoading && <SpinnerLoader />}
      </div>
      <br />
      {isFeeedback && <Alert color={isFeeedback}>{feedback}</Alert>}
    </>
  );
}
