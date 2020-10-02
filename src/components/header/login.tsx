import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AccessLogin } from "../../api/fetch/login";
import { useHistory } from "react-router-dom";
import { ResponseAxios } from "../../interface";
import { SpinnerLoader } from "../../components/loader/spinner";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
  Alert,
} from "reactstrap";

interface Login {
  email: string;
  password: string;
}

export function LoginForm() {
  const { control, handleSubmit, errors } = useForm<Login>();
  const history = useHistory<typeof useHistory>();
  const [feedback, setFeedback] = useState<string>("");
  const [isFeeedback, setIsFeedback] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const send = async (data: Login) => {
    setIsFeedback("");
    setIsLoading(true);

    const { email, password } = data;

    try {
      const resLogin: ResponseAxios = await AccessLogin(email, password);

      if (resLogin.respuesta.type === "ERROR") {
        setIsFeedback("danger");
        setFeedback(resLogin.respuesta.feeback);
      } else {
      }
    } catch (error) {}
  };

  return (
    <>
      <Form onSubmit={handleSubmit(send)}>
        <FormGroup>
          <Label for="email">Email:</Label>
          <Controller
            as={Input}
            type="email"
            name="email"
            control={control}
            rules={{ required: true }}
            placeholder="Ingresa tu email"
          />
          <FormFeedback invalid={errors.email ? true : false}>
            {errors.email && "Escribe tu direccion de correo"}
          </FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="password">Contraseña:</Label>
          <Controller
            as={Input}
            type="password"
            name="password"
            control={control}
            rules={{ required: true }}
            placeholder="Ingresa tu contraseña"
          />
          <FormFeedback invalid={errors.password ? true : false}>
            {errors.password && "Escribe tu contraseña"}
          </FormFeedback>
        </FormGroup>

        <Button type="submit" color="info" block>
          Entrar
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
