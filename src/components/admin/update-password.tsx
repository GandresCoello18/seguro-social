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
import { SpinnerLoader } from "../loader/spinner";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../redux";
import { SetCitas } from "../../redux/modulos/citas";
import { ResponseAxios } from "../../interface";
import { BsFillGearFill } from "react-icons/bs";
import { UpdatePasswordAdmin } from "../../api/fetch/usuarios";

interface Update {
  password: string;
}

interface Props {
  id_user: string;
}

export function UpdatePassword({ id_user }: Props) {
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
  const toggleToolti = () => setTooltipOpen(!tooltipOpen);

  const dispatch: Dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFeeedback, setIsFeeedback] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const toggle = () => setModal(!modal);
  const { register, errors, handleSubmit } = useForm<Update>();

  const { usuarios } = useSelector((state: RootState) => state.UsuarioReducer);

  const send = async (data: Update) => {
    setIsFeeedback("");
    setIsLoading(true);
    const { password } = data;

    const resUpdatePassword: ResponseAxios = await UpdatePasswordAdmin(
      id_user,
      password
    );

    setFeedback(resUpdatePassword.respuesta.feeback);

    if (resUpdatePassword.respuesta.type === "ERROR") {
      setIsFeeedback("danger");
    } else {
      setIsFeeedback("success");
      dispatch(SetCitas([...resUpdatePassword.axios.data.user, ...usuarios]));
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
        Actualizar contraseña
      </Tooltip>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Actualizar contraseña</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit(send)}>
            <FormGroup>
              <Label for="cedula">Escriba la nueva clave:</Label>
              <input
                className="form-control"
                ref={register({ required: true })}
                name="password"
                type="passeord"
                placeholder="Escriba la nueva clave"
              />
              <FormFeedback invalid={errors.password ? true : false}>
                {errors.password && "Escriba la nueva contraseña"}
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
