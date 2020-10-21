import React, { useState } from "react";
import {
  Alert,
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Tooltip,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { UpdateCita } from "../../api/fetch/cita";
import { SpinnerLoader } from "../loader/spinner";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../redux";
import { SetCitas } from "../../redux/modulos/citas";
import { Cita_INT, ResponseAxios } from "../../interface";
import { BsFillGearFill } from "react-icons/bs";

interface Update {
  status: string;
}

interface Props {
  estado: string | undefined;
  id_cita: string;
}

export function UpdateStatusCita({ estado, id_cita }: Props) {
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
  const toggleToolti = () => setTooltipOpen(!tooltipOpen);

  const dispatch: Dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFeeedback, setIsFeeedback] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const toggle = () => setModal(!modal);
  const { register, errors, handleSubmit } = useForm<Update>();

  const Citas: Array<Cita_INT> = useSelector(
    (state: RootState) => state.CitasReducer.citas
  );

  const send = async (data: Update) => {
    setIsFeeedback("");
    setIsLoading(true);
    const { status } = data;

    const resUpdateCita: ResponseAxios = await UpdateCita(id_cita, status);

    setFeedback(resUpdateCita.respuesta.feeback);

    if (resUpdateCita.respuesta.type === "ERROR") {
      setIsFeeedback("danger");
    } else {
      setIsFeeedback("success");
      dispatch(SetCitas([...resUpdateCita.axios.data.cita, ...Citas]));
    }

    setIsLoading(false);
  };

  return (
    <>
      <Button id="TooltipCitaStatus" color="warning" onClick={toggle}>
        <BsFillGearFill />
      </Button>

      <Tooltip
        placement="right"
        isOpen={tooltipOpen}
        target="TooltipCitaStatus"
        toggle={toggleToolti}
      >
        Actualizar Estado de Cita
      </Tooltip>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Actualizar Estado</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit(send)}>
            <FormGroup>
              <Label for="cedula">Estados:</Label>
              <select
                className="form-control"
                ref={register({ required: true })}
                name="status"
              >
                <option value="Reservado" disabled={estado === "Reservado"}>
                  Reservado
                </option>
                <option value="Atendido" disabled={estado === "Atendido"}>
                  Atendido
                </option>
                <option value="Cancelado" disabled={estado === "Cancelado"}>
                  Cancelado
                </option>
              </select>
              <FormFeedback invalid={errors.status ? true : false}>
                {errors.status && "Selecciona el estado de la cita"}
              </FormFeedback>
            </FormGroup>

            <Button type="submit" disabled={isLoading} color="warning" block>
              Actualizar
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
