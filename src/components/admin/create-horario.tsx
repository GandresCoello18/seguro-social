import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Dispatch, RootState } from "../../redux";
import { CreateHorario } from "../../api/fetch/horario";
import { SetHorarios } from "../../redux/modulos/horarios";
import {
  Alert,
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Label,
} from "reactstrap";
import { SpinnerLoader } from "../loader/spinner";
import { Horario_INT, Personal_IMT, ResponseAxios } from "../../interface";

interface Horario {
  id_personal: number;
  jornada: string;
  dia: string;
}

export function CreateHorarioFrom() {
  const { errors, handleSubmit, register } = useForm<Horario>();
  const dispatch: Dispatch = useDispatch();
  const history = useHistory<typeof useHistory>();
  const [feedback, setFeedback] = useState<string>("");
  const [isFeeedback, setIsFeedback] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const PersonalReducer: Array<Personal_IMT> = useSelector(
    (state: RootState) => state.PersonalReducer.personal
  );
  const HorarioReducer: Array<Horario_INT> = useSelector(
    (state: RootState) => state.HorariosReducer.horarios
  );

  const send = async (data: Horario) => {
    setIsLoading(true);
    setIsFeedback("");

    const obj: Horario_INT = {
      id_horario: "",
      ...data,
    };

    const resHorario: ResponseAxios = await CreateHorario(obj);

    if (resHorario.respuesta.type === "ERROR") {
      setIsFeedback("danger");
      setFeedback(resHorario.respuesta.feeback);
    } else {
      setIsFeedback("success");
      setFeedback("Se agrego el personal al horario");
      dispatch(SetHorarios([...HorarioReducer, ...resHorario.axios.data]));
    }

    setIsLoading(false);
  };

  return (
    <>
      <h2 className="text-center p-4">Asignar Horario</h2>

      <Form onSubmit={handleSubmit(send)}>
        <FormGroup>
          <Label for="email">Personal:</Label>
          <select
            name="id_personal"
            ref={register({ required: true })}
            className="form-control"
          >
            {PersonalReducer.map((personal) => (
              <option value={personal.id_personal}>
                {personal.nombres} {personal.apellido} - {personal.cargo}
              </option>
            ))}
          </select>
          <FormFeedback invalid={errors.id_personal ? true : false}>
            {errors.id_personal && "Seleciona el personal"}
          </FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="password">Jornada:</Label>
          <select
            className="form-control"
            ref={register({ required: true })}
            name="jornada"
          >
            <option value="Mañana">Mañana</option>
            <option value="Tarde">Tarde</option>
          </select>
          <FormFeedback invalid={errors.jornada ? true : false}>
            {errors.jornada && "Selecciona una jornada"}
          </FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="password">Dia:</Label>
          <select
            className="form-control"
            ref={register({ required: true })}
            name="dia"
          >
            <option value="Lunes">Lunes</option>
            <option value="Martes">Martes</option>
            <option value="Miercoles">Miercoles</option>
            <option value="Jueves">Jueves</option>
            <option value="Viernes">Viernes</option>
          </select>
          <FormFeedback invalid={errors.dia ? true : false}>
            {errors.dia && "Selecciona un dia"}
          </FormFeedback>
        </FormGroup>

        <Button type="submit" disabled={isLoading} color="warning" block>
          Guardar
        </Button>
      </Form>

      <br />

      <div style={{ textAlign: "center" }}>
        {isLoading && <SpinnerLoader />}
      </div>

      <br />

      {isFeeedback && <Alert color={isFeeedback}>{feedback}</Alert>}
    </>
  );
}
