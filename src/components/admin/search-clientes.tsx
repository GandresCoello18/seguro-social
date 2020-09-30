import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Form, FormGroup, Input, Button } from "reactstrap";

interface Search {
  tipo: string;
  key: string;
}

export function SearchClientes() {
  const { control, handleSubmit } = useForm<Search>();
  const [tipo, setTipo] = useState<string>("1");

  const send = (data: Search): void => {
    data.tipo = tipo;
    console.log(data);
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
                    <option value="1">1</option>
                    <option value="2">2</option>
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
        </div>
      </Form>
    </>
  );
}
