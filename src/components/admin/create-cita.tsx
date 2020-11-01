import React, { useState, useEffect } from "react";
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
  Row,
  Col,
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
import { ValidarCitas } from "../../api/cita";

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
  const [dia, setDia] = useState<string>("");
  const [jornada, setJornada] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [Medico, setMedico] = useState<string>("");
  const [FechasCitas, setFechasCItas] = useState<Array<Date>>([]);
  const [HorasCitas, setHorasCitas] = useState<Array<string>>([]);
  const [SelectMes, setSelectMes] = useState<string>(fecha_actual());
  const [HorarioMedico, setHorarioMedico] = useState<Array<Horario_INT>>([]);
  const [isHorario, setHorario] = useState<string>("");

  const Horario: Array<Horario_INT> = useSelector(
    (state: RootState) => state.HorariosReducer.horarios
  );
  const Usuario: Array<Usuario_INT> = useSelector(
    (state: RootState) => state.UsuarioReducer.usuarios
  );
  const MyUser: Array<Usuario_INT> = useSelector(
    (state: RootState) => state.UsuarioReducer.myUser
  );
  const citas: Array<Cita_INT> = useSelector(
    (state: RootState) => state.CitasReducer.citas
  );

  useEffect(() => {
    if (jornada && dia) {
      const horarioMedico = Horario.filter((item) => {
        if (jornada + "-" + dia === item.jornada + "-" + item.dia) {
          return item;
        }
      });

      setHorarioMedico(horarioMedico);
    }
  }, [jornada, dia]);

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

  const updateMes = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value[5] === "0") {
      const mes = e.target.value[6];
      const sub = e.target.value.substr(0, 5);
      setSelectMes(sub + mes);
    } else {
      setSelectMes(e.target.value + "-1");
    }
  };

  const selecCargo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const horarioMedico = Horario.filter((item) => {
      if (
        e.target.value === "Todos" &&
        jornada + "-" + dia === item.jornada + "-" + item.dia
      ) {
        return Horario;
      } else {
        if (
          e.target.value === item.cargo &&
          jornada + "-" + dia === item.jornada + "-" + item.dia
        ) {
          return item;
        }
      }
    });

    setHorarioMedico(horarioMedico);
  };

  const selectDia = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDia(event.target.value);

    let dia: number = 0;
    switch (event.target.value) {
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
    }
    setFechasCItas(getMondays(new Date(SelectMes), dia));
  };

  const selectFecha = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsLoading(true);
    try {
      const resHorasDisponibles = await ValidarCitas(
        isHorario,
        moment(e.target.value).format().substr(0, 10)
      );
      setHorasCitas(resHorasDisponibles.data);
      if (resHorasDisponibles.data.length === 0) {
        setIsFeedback("danger");
        setFeedback("NO HAY HORAS DISPONIBLES PARA ESTA FECHA");
      }
      setIsLoading(false);
    } catch (error) {
      setIsFeedback("danger");
      setFeedback(error.message);
    }
    setIsLoading(false);
  };

  return (
    <>
      {MyUser.length > 0 && (
        <>
          <Button color="primary" onClick={toggle}>
            Crear nueva cita
          </Button>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Nueva cita</ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSubmit(send)}>
                <FormGroup>
                  <Label for="password">Seleccionar mes:</Label>
                  <input
                    type="month"
                    min="2020-10"
                    className="form-control"
                    onChange={updateMes}
                    defaultValue={fecha_actual()}
                  />
                </FormGroup>

                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="email">Dia:</Label>
                      <select className="form-control" onChange={selectDia}>
                        <option value="Lunes">Lunes</option>
                        <option value="Martes">Martes</option>
                        <option value="Miercoles">Miercoles</option>
                        <option value="Jueves">Jueves</option>
                        <option value="Viernes">Viernes</option>
                      </select>
                      <FormFeedback invalid={errors.id_horario ? true : false}>
                        {errors.id_horario && "Seleccione el horario"}
                      </FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="email">Jornada:</Label>
                      <select
                        className="form-control"
                        onChange={(event) => setJornada(event.target.value)}
                      >
                        <option value="Mañana">Mañana</option>
                        <option value="Tarde">Tarde</option>
                      </select>
                      <FormFeedback invalid={errors.id_horario ? true : false}>
                        {errors.id_horario && "Seleccione el horario"}
                      </FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>

                <FormGroup>
                  <Label for="email">Cargo:</Label>
                  <select
                    className="form-control"
                    onChange={selecCargo}
                    disabled={HorarioMedico.length === 0}
                  >
                    <option value="Todos">Todos</option>
                    <option value="Medico general">Medico general</option>
                    <option value="Odontologo">Odontologo</option>
                  </select>
                </FormGroup>

                <FormGroup>
                  <Label for="email">Medico:</Label>
                  <select
                    className="form-control"
                    onChange={(e) =>
                      e.target.value !== "none" && setHorario(e.target.value)
                    }
                    ref={register({ required: true })}
                    name="id_horario"
                    disabled={HorarioMedico.length === 0}
                  >
                    <option value="none">Medicos.......</option>
                    {HorarioMedico.map((medico) => (
                      <option value={medico.id_horario}>
                        {medico.nombres} - {medico.apellido} - ( {medico.cargo}{" "}
                        )
                      </option>
                    ))}
                  </select>
                </FormGroup>

                <FormGroup>
                  <Label for="email">Afiliados:</Label>
                  <select
                    name="id_user"
                    ref={register({ required: true })}
                    className="form-control"
                  >
                    {Usuario.filter(
                      (user) => user.id_user !== MyUser[0].id_user
                    ).map((user) => (
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
                  <Label for="password">
                    Fechas asignadas por este horario:
                  </Label>
                  <select
                    className="form-control"
                    onChange={selectFecha}
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

                <Button
                  type="submit"
                  disabled={isLoading}
                  color="warning"
                  block
                >
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
      )}
    </>
  );
}
