import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

interface Registro {
  cedula: string;
  email: string;
  password: string;
}

export function RegistroForm() {
  const { handleSubmit, control, errors } = useForm<Registro>();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="email">Email:</Label>
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

        <Button type="submit" color="primary" block>
          Registrarme
        </Button>
      </Form>
    </>
  );
}
