import React, { useState } from "react";
import { CreateNewCita } from "../../api/fetch/cita";
import { Controller, useForm } from "react-hook-form";
import { Dispatch, RootState } from "../../redux";
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
import { SpinnerLoader } from "../loader/spinner";
import { SetCitas } from "../../redux/modulos/citas";
import {
  Horario_INT,
  ResponseAxios,
  Usuario_INT,
  Cita_INT,
} from "../../interface";
import { fecha_actual } from "../../hooks/fecha";
import moment from "moment";
import { getMondays } from "../../hooks/fecha";

interface Cita {
  id_horario: string;
  id_user: string;
  fecha_cita: string;
  hora_cita: string;
}

export function CreateCita() {
  const [modal, setModal] = useState<boolean>(false);
  const toggle = () => setModal(!modal);

  const { control, handleSubmit, register, errors } = useForm<Cita>();
  const dispatch: Dispatch = useDispatch();
  const [feedback, setFeedback] = useState<string>("");
  const [isFeeedback, setIsFeedback] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [Medico, setMedico] = useState<string>("");
  const [FechasCitas, setFechasCItas] = useState<Array<Date>>([]);
  const [HorasCitas, setHorasCitas] = useState<Array<string>>([]);

  const Horario: Array<Horario_INT> = useSelector(
    (state: RootState) => state.HorariosReducer.horarios
  );
  const Usuario: Array<Usuario_INT> = useSelector(
    (state: RootState) => state.UsuarioReducer.usuarios
  );
  const citas: Array<Cita_INT> = useSelector(
    (state: RootState) => state.CitasReducer.citas
  );

  const send = async (data: Cita) => {
    setIsFeedback("");
    setFeedback("");
    setIsLoading(true);
    const { id_horario, id_user, fecha_cita, hora_cita } = data;

    const cita: Cita_INT = {
      id_cita: "",
      id_user,
      id_horario,
      fecha_cita: moment(fecha_cita).format().substr(0, 10),
      hora_cita,
    };

    const resCita: ResponseAxios = await CreateNewCita(cita);

    if (resCita.respuesta.type === "ERROR") {
      setIsFeedback("danger");
      setFeedback(resCita.respuesta.feeback);
    } else {
      setIsFeedback("success");
      setFeedback(
        `Se creo la cita para la fecha de ${moment(fecha_cita).format(
          "LL"
        )} a las ${hora_cita}`
      );
      dispatch(SetCitas([...citas, ...resCita.axios.data]));
      setModal(false);
    }

    setIsLoading(false);
  };

  const selectHorario = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const solo = Horario.find((item) => item.id_horario === e.target.value);
    setMedico(solo?.nombres + " " + solo?.apellido + " - " + solo?.cargo);
    let dia: number = 0;
    switch (solo?.dia) {
      case "Lunes":
        dia = 1;
        break;
      case "Martes":
        dia = 2;
        break;
      case "Miercoles":
        dia = 3;
        break;
      case "Jueves":
        dia = 4;
        break;
      case "Viernes":
        dia = 5;
        break;
      case "Sabado":
        dia = 6;
        break;
      case "Domingo":
        dia = 0;
        break;
    }
    setFechasCItas(getMondays(new Date(fecha_actual()), dia));

    switch (solo?.jornada) {
      case "Mañana":
        setHorasCitas([
          "07:00",
          "07:30",
          "08:00",
          "08:30",
          "09:00",
          "09:30",
          "10:00",
          "10:30",
          "11:00",
          "11:30",
          "12:00",
        ]);
        break;
      case "Tarde":
        setHorasCitas([
          "13:00",
          "13:30",
          "14:00",
          "14:30",
          "15:00",
          "15:30",
          "16:00",
          "16:30",
          "17:00",
          "17:30",
          "18:00",
        ]);
        break;
      case "Noche":
        setHorasCitas(["19:00", "19:30", "20:00", "20:30", "21:00", "21:30"]);
        break;
    }
  };

  return (
    <>
      <Button color="primary" onClick={toggle}>
        Crear nueva cita
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Nueva cita</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit(send)}>
            <FormGroup>
              <Label for="email">Horario:</Label>
              <select
                name="id_horario"
                onChange={selectHorario}
                ref={register({ required: true })}
                className="form-control"
              >
                {Horario.map((horario) => (
                  <option value={horario.id_horario}>
                    ( Jornada ) {horario.jornada} - ( Dia ) {horario.dia}
                  </option>
                ))}
              </select>
              <FormFeedback invalid={errors.id_horario ? true : false}>
                {errors.id_horario && "Seleccione el horario"}
              </FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label for="email">Medico:</Label>
              <input
                className="form-control"
                disabled={true}
                type="text"
                defaultValue={Medico}
              />
            </FormGroup>

            <FormGroup>
              <Label for="email">Usuario:</Label>
              <select
                name="id_user"
                ref={register({ required: true })}
                className="form-control"
              >
                {Usuario.map((user) => (
                  <option value={user.id_user}>
                    {user.cedula} - {user.email}
                  </option>
                ))}
              </select>
              <FormFeedback invalid={errors.id_user ? true : false}>
                {errors.id_user && "Seleccione el usuario"}
              </FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label for="password">Fecha:</Label>
              <select
                className="form-control"
                disabled={FechasCitas?.length === 0}
                name="fecha_cita"
                ref={register({ required: true })}
              >
                {FechasCitas?.map((fecha) => (
                  <option value={fecha.toString()}>
                    {moment(fecha).format("LL")}
                  </option>
                ))}
              </select>
              <FormFeedback invalid={errors.fecha_cita ? true : false}>
                {errors.fecha_cita && "Seleccione la fecha"}
              </FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label for="password">Hora:</Label>
              <Controller
                as={<Input invalid={errors.hora_cita ? true : false} />}
                type="time"
                name="hora_cita"
                control={control}
                disabled={HorasCitas.length === 0}
                list="listalimitestiempo"
                rules={{ required: true }}
                placeholder="Ingresa la fecha"
              />
              <datalist id="listalimitestiempo">
                {HorasCitas.map((hora) => (
                  <option value={hora}>{hora}</option>
                ))}
              </datalist>
              <FormFeedback invalid={errors.hora_cita ? true : false}>
                {errors.hora_cita && "Seleccione la hora"}
              </FormFeedback>
            </FormGroup>

            <Button type="submit" disabled={isLoading} color="warning" block>
              Registrar cita
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
