import React, { useState } from "react";
import { CreateCountUser } from "../../api/fetch/usuarios";
import { Usuario_INT, ResponseAxios } from "../../interface";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Alert,
} from "reactstrap";
import { SpinnerLoader } from "../loader/spinner";

interface Client {
  cedula: number;
  email: string;
  password?: string;
  admin?: boolean;
}

export function CreateCLient() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFeeedback, setIsFeeedback] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const toggle = () => {
    setModal(!modal);
    setIsFeeedback("");
  };

  const { control, handleSubmit, errors } = useForm<Client>();

  const send = async (data: Client) => {
    setIsFeeedback("");
    setIsLoading(true);

    const user: Usuario_INT = {
      id_user: "",
      ...data,
      status: "",
      password: "",
    };

    const resCreate: ResponseAxios = await CreateCountUser(user);

    if (resCreate.respuesta.type === "ERROR") {
      setIsFeeedback("danger");
      setFeedback(resCreate.respuesta.feeback);
    } else {
      setIsFeeedback("success");
      setFeedback("Usuario creado correctamente.");
    }

    setIsLoading(false);
  };

  return (
    <>
      <Button color="primary" onClick={toggle}>
        Crear nuevo cliente
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Crear nuevo cliente</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit(send)}>
            <FormGroup>
              <Label for="cedula">Cedula:</Label>
              <Controller
                as={<Input invalid={errors.cedula ? true : false} />}
                type="number"
                name="cedula"
                control={control}
                rules={{ required: true }}
                placeholder="Ingresa tu cedula"
              />
              <FormFeedback invalid={errors.cedula ? true : false}>
                {errors.cedula && "Escribe tu numero de indentificacion"}
              </FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label for="email">Email:</Label>
              <Controller
                as={<Input invalid={errors.email ? true : false} />}
                type="email"
                name="email"
                control={control}
                rules={{ required: true }}
                placeholder="Ingresa tu direccion de correo"
              />
              <FormFeedback invalid={errors.email ? true : false}>
                {errors.email && "Escribe tu contraseña"}
              </FormFeedback>
            </FormGroup>

            <Button type="submit" color="info" block>
              Guardar
            </Button>
          </Form>

          <br />

          <div style={{ textAlign: "center" }}>
            {isLoading && <SpinnerLoader />}
          </div>

          <br />

          {isFeeedback && <Alert color={isFeeedback}>{feedback}</Alert>}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Salir
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
