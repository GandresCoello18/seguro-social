import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

interface Login {
  email: string;
  password: string;
}

export function LoginForm() {
  const { control, handleSubmit } = useForm<Login>();

  const send = (data: Login) => {
    console.log(data);
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
            defaultValue=""
            placeholder="Ingresa tu email"
          />
        </FormGroup>

        <FormGroup>
          <Label for="password">Contraseña:</Label>
          <Controller
            as={Input}
            type="password"
            name="password"
            control={control}
            defaultValue=""
            placeholder="Ingresa tu contraseña"
          />
        </FormGroup>

        <Button type="submit" color="info" block>
          Entrar
        </Button>
      </Form>
    </>
  );
}
