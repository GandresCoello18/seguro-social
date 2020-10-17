import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { SpinnerLoader } from "../loader/spinner";
import { EnviarCorreo } from "../../api/fetch/contacto";
import { ResponseAxios } from "../../interface";

interface Props {
  email: string;
}

interface Email {
  correo: string;
  message: string;
}

export function BtnSendEmail({ email }: Props) {
  const [modal, setModal] = useState<boolean>(false);
  const toggle = () => setModal(!modal);

  const [feedback, setFeedback] = useState<string>("");
  const [isFeeedback, setIsFeedback] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { control, handleSubmit, errors } = useForm<Email>();

  const send = async (data: Email) => {
    setIsLoading(true);
    setIsFeedback("");
    const { correo, message } = data;

    const resSend: ResponseAxios = await EnviarCorreo(correo, message);

    setFeedback(resSend.respuesta.feeback);
    if (resSend.respuesta.type === "ERROR") {
      setIsFeedback("danger");
    } else {
      setIsFeedback("success");
    }

    setIsLoading(false);
  };

  return (
    <>
      <Button color="primary" onClick={toggle}>
        Responder
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Responder email ha: <u>{email}</u>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit(send)}>
            <FormGroup>
              <Label for="cedula">Email:</Label>
              <Controller
                as={<Input invalid={errors.correo ? true : false} />}
                type="email"
                name="correo"
                defaultValue={email}
                control={control}
                rules={{ required: true }}
                placeholder="Ingresa la direccion de correo electronico"
              />
              <FormFeedback invalid={errors.correo ? true : false}>
                {errors.correo && "Escribe la direccion de correo electronico"}
              </FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label for="cedula">Mensaje:</Label>
              <Controller
                as={
                  <Input
                    type="textarea"
                    invalid={errors.message ? true : false}
                  />
                }
                type="textarea"
                name="message"
                control={control}
                rules={{ required: true }}
                placeholder={`Escriba algun mensaje para: ${email}`}
              />
              <FormFeedback invalid={errors.message ? true : false}>
                {errors.message && `Escriba algun mensaje para: ${email}`}
              </FormFeedback>
            </FormGroup>

            <Button type="submit" disabled={isLoading} color="success" block>
              Enviar Mensaje
            </Button>
          </Form>

          {isLoading && <SpinnerLoader />}
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
