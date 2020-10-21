import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
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
import { CreatePersona } from "../../api/fetch/personal";
import { Personal_IMT, ResponseAxios } from "../../interface";
import { SetPersonal } from "../../redux/modulos/personal";
import { Dispatch, RootState } from "../../redux";
import { SpinnerLoader } from "../loader/spinner";

interface Personal {
  nombres: string;
  apellido: string;
  cargo: string;
  imagen: string;
}

export function CreatePersonal() {
  const Personal: Array<Personal_IMT> = useSelector(
    (state: RootState) => state.PersonalReducer.personal
  );
  const dispatch: Dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFeeedback, setIsFeeedback] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const toggle = () => {
    setModal(!modal);
    setIsFeeedback("");
  };

  const { control, handleSubmit, register, errors } = useForm<Personal>();

  const send = async (data: Personal) => {
    setIsLoading(true);
    setIsFeeedback("");

    const { nombres, apellido, cargo } = data;
    let img: any = document.getElementById("imagen");
    const form: FormData = new FormData();
    form.append("nombres", nombres);
    form.append("apellido", apellido);
    form.append("cargo", cargo);
    form.append("imagen", img.files[0]);

    const resPersonal: ResponseAxios = await CreatePersona(form);

    if (resPersonal.respuesta.type === "ERROR") {
      setIsFeeedback("danger");
      setFeedback(resPersonal.respuesta.feeback);
    } else {
      setIsFeeedback("success");
      setFeedback("SE CREO EL NUEVO MEDICO");
      dispatch(SetPersonal([...Personal, ...resPersonal.axios.data]));
    }

    setIsLoading(false);
  };

  return (
    <>
      <Button color="primary" onClick={toggle}>
        Crear nuevo medico
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Crear nuevo Medico</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit(send)}>
            <FormGroup>
              <Label for="cedula">Nombres:</Label>
              <Controller
                as={<Input invalid={errors.nombres ? true : false} />}
                type="text"
                name="nombres"
                min={0}
                control={control}
                rules={{ required: true }}
                placeholder="Ingresa tus nombres"
              />
              <FormFeedback invalid={errors.nombres ? true : false}>
                {errors.nombres && "Escribe tus nombres"}
              </FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label for="nombres">Apellido:</Label>
              <Controller
                as={<Input invalid={errors.apellido ? true : false} />}
                type="text"
                name="apellido"
                control={control}
                rules={{ required: true }}
                placeholder="Ingresa tus apellidos"
              />
              <FormFeedback invalid={errors.apellido ? true : false}>
                {errors.apellido && "Escribe tus Apellidos"}
              </FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label for="apellidos">Cargo:</Label>
              <select
                className="form-control"
                ref={register({ required: true })}
                name="cargo"
              >
                <option value="Medico general">Medico general</option>
                <option value="Odontologo">Odontologo</option>
              </select>
              <FormFeedback invalid={errors.cargo ? true : false}>
                {errors.cargo && "Seleccione el cargo"}
              </FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label for="email">Imagen:</Label>
              <Controller
                as={<Input invalid={errors.imagen ? true : false} />}
                type="file"
                name="imagen"
                id="imagen"
                control={control}
                rules={{ required: true }}
                className="form-control"
              />
              <FormFeedback invalid={errors.imagen ? true : false}>
                {errors.imagen && "Selecciona una imagen"}
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
