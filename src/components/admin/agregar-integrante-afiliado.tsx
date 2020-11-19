import React, { useState } from "react";
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
  Tooltip,
} from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import { diferencia_de_años, fecha_actual } from "../../hooks/fecha";
import { SpinnerLoader } from "../loader/spinner";
import { Dispatch, RootState } from "../../redux";
import { SetGrupos } from "../../redux/modulos/grupos";
import { useDispatch, useSelector } from "react-redux";
import { IntegrarAlGrupo } from "../../api/fetch/grupo";
import { Grupo_afiliados_INT, ResponseAxios } from "../../interface";
import { BsPersonPlusFill } from "react-icons/bs";

interface Props {
  id_afiliado: string;
  nombres: string;
  apellido: string;
  setIsReload: Function;
}

interface Integrante {
  nombres: string;
  apellidos: string;
  sexo: string;
  fecha_nacimiento: string;
  tipo_familia: string;
  cedula: number;
}

export function AgregarIntegranteAfiliado({
  id_afiliado,
  nombres,
  apellido,
  setIsReload,
}: Props) {
  const dispatch: Dispatch = useDispatch();
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
  const toggleToolti = () => setTooltipOpen(!tooltipOpen);
  const [modal, setModal] = useState<boolean>(false);
  const toggle = () => {
    setModal(!modal);
    setIsFeedback("");
  };
  const [feedback, setFeedback] = useState<string>("");
  const [isFeeedback, setIsFeedback] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { control, register, handleSubmit, errors } = useForm<Integrante>();

  const Grupos: Array<Grupo_afiliados_INT> = useSelector(
    (state: RootState) => state.GruposReducer.grupos
  );

  const send = async (data: Integrante) => {
    setIsLoading(true);
    setIsFeedback("");
    const {
      nombres,
      apellidos,
      sexo,
      fecha_nacimiento,
      tipo_familia,
      cedula,
    } = data;

    if (
      tipo_familia === "Hijos" &&
      Math.abs(diferencia_de_años(fecha_nacimiento)) > 18
    ) {
      setIsFeedback("danger");
      setFeedback("Los hijos necesitan ser menor de edad para integrarte");
      setIsLoading(false);
    } else {
      const grupo: Grupo_afiliados_INT = {
        id_user: id_afiliado,
        nombres,
        apellidos,
        sexo,
        fecha_nacimiento,
        tipo_familiar: tipo_familia,
        cedula_g: cedula,
      };

      const resGrupo: ResponseAxios = await IntegrarAlGrupo(grupo);

      if (resGrupo.respuesta.type === "ERROR") {
        setIsFeedback("danger");
        setFeedback(resGrupo.respuesta.feeback);
      } else {
        setIsFeedback("success");
        setFeedback(
          `SE INTEGRO AL SEGURO DEL AFILIADO: ${nombres.toUpperCase()} ${apellido.toUpperCase()}`
        );
        dispatch(SetGrupos([...Grupos, ...resGrupo.axios.data]));
        setIsReload(true);
      }
    }

    setIsLoading(false);
  };

  return (
    <>
      <Button id="TooltipAddAfiliado" color="success" onClick={toggle}>
        <BsPersonPlusFill />
      </Button>
      <Tooltip
        placement="right"
        isOpen={tooltipOpen}
        target="TooltipAddAfiliado"
        toggle={toggleToolti}
      >
        Agregar integrantes al afiliado
      </Tooltip>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Agregar integrante a:{" "}
          <u>
            {nombres} {apellido}
          </u>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit(send)}>
            <FormGroup>
              <Label for="Cedula">Cedula:</Label>
              <Controller
                as={<Input invalid={errors.cedula ? true : false} />}
                type="number"
                name="cedula"
                min={0}
                control={control}
                rules={{ required: true }}
                placeholder="Ingresa tu numero de identidad"
              />
              <FormFeedback invalid={errors.cedula ? true : false}>
                {errors.cedula && "Ingresa tu numero de indentidad"}
              </FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label for="nombres">Nombres:</Label>
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
                {errors.nombres && "Ingresa tus nombres"}
              </FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label for="apelllidos">Apellidos:</Label>
              <Controller
                as={<Input invalid={errors.apellidos ? true : false} />}
                type="text"
                name="apellidos"
                min={0}
                control={control}
                rules={{ required: true }}
                placeholder="Ingresa tus Apellidos"
              />
              <FormFeedback invalid={errors.apellidos ? true : false}>
                {errors.apellidos && "Ingresa tus apellidos"}
              </FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label for="tipo_familia">Tipo de familia:</Label>
              <select
                name="tipo_familia"
                ref={register({ required: true })}
                className="form-control"
              >
                <option value="Hijos">Hijos</option>
                <option value="Conyugue">Conyugue</option>
              </select>
              <FormFeedback invalid={errors.tipo_familia ? true : false}>
                {errors.tipo_familia && "Seleccione el tipo de familia"}
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
                {errors.sexo && "Seleccione tu sexo"}
              </FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label for="fecha_nacimineto">Fecha nacimiento:</Label>
              <Controller
                as={<Input invalid={errors.fecha_nacimiento ? true : false} />}
                type="date"
                name="fecha_nacimiento"
                max={fecha_actual()}
                control={control}
                rules={{ required: true }}
                placeholder="Ingresa tu fecha de nacimiento"
              />
              <FormFeedback invalid={errors.fecha_nacimiento ? true : false}>
                {errors.fecha_nacimiento && "Ingresa tu fecha de nacimiento"}
              </FormFeedback>
            </FormGroup>

            <Button type="submit" disabled={isLoading} color="warning" block>
              Agrupar al afiliado:{" "}
              <u>
                {nombres} {apellido}
              </u>
            </Button>
          </Form>

          {isLoading && <SpinnerLoader />}

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
