import React, { useState } from "react";
import { CreateCountUser } from "../../api/fetch/usuarios";
import { useSelector, useDispatch } from "react-redux";
import { RootState, Dispatch } from "../../redux";
import { SetUsuarios } from "../../redux/modulos/usuarios";
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
import { fecha_actual } from "../../hooks/fecha";

interface Client {
  cedula: number;
  email: string;
  password?: string;
  admin?: boolean;
  nombres: string;
  apellidos: string;
  sexo: string;
  fecha_nacimiento: string;
}

export function CreateCLient() {
  const dispatch: Dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFeeedback, setIsFeeedback] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const toggle = () => {
    setModal(!modal);
    setIsFeeedback("");
  };

  const { control, handleSubmit, register, errors } = useForm<Client>();

  const UsuarioReducer: Array<Usuario_INT> = useSelector(
    (state: RootState) => state.UsuarioReducer.usuarios
  );

  const send = async (data: Client) => {
    setIsFeeedback("");
    setIsLoading(true);

    const user: Usuario_INT = {
      id_user: "",
      ...data,
      status: "",
      password: "",
      admin: true,
    };

    if (user.cedula.toString().length === 10) {
      const resCreate: ResponseAxios = await CreateCountUser(user);

      if (resCreate.respuesta.type === "ERROR") {
        setIsFeeedback("danger");
        setFeedback(resCreate.respuesta.feeback);
      } else {
        setIsFeeedback("success");
        setFeedback("Usuario creado correctamente.");
        dispatch(SetUsuarios([...UsuarioReducer, ...resCreate.axios.data]));
        setModal(false);
      }
    } else {
      setIsFeeedback("danger");
      setFeedback("La cedula debe contener 10 caracteres.");
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
                min={0}
                control={control}
                rules={{ required: true }}
                placeholder="Ingresa tu cedula"
              />
              <FormFeedback invalid={errors.cedula ? true : false}>
                {errors.cedula && "Escribe tu numero de indentificacion"}
              </FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label for="nombres">Nombres:</Label>
              <Controller
                as={<Input invalid={errors.nombres ? true : false} />}
                type="text"
                name="nombres"
                control={control}
                rules={{ required: true }}
                placeholder="Ingresa tus nombres"
              />
              <FormFeedback invalid={errors.nombres ? true : false}>
                {errors.cedula && "Escribe tus nombres"}
              </FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label for="apellidos">Apellidos:</Label>
              <Controller
                as={<Input invalid={errors.apellidos ? true : false} />}
                type="text"
                name="apellidos"
                control={control}
                rules={{ required: true }}
                placeholder="Ingresa tus apellidos"
              />
              <FormFeedback invalid={errors.apellidos ? true : false}>
                {errors.apellidos && "Escribe tus apellidos"}
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

            <FormGroup>
              <Label for="sexo">Sexo:</Label>
              <select
                name="sexo"
                ref={register({ required: true })}
                className="form-control"
              >
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
              <FormFeedback invalid={errors.sexo ? true : false}>
                {errors.sexo && "Seleccione su sexo"}
              </FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label for="fecha_nacimiento">Fecha de nacimiento:</Label>
              <Controller
                as={<Input invalid={errors.fecha_nacimiento ? true : false} />}
                type="date"
                max={fecha_actual()}
                name="fecha_nacimiento"
                control={control}
                rules={{ required: true }}
                placeholder="Selecciona tu fecha de nacimiento"
              />
              <FormFeedback invalid={errors.fecha_nacimiento ? true : false}>
                {errors.fecha_nacimiento && "Selecciona tu fecha de nacimiento"}
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
