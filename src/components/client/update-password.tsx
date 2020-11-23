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
} from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import { UpdateClaveUser } from "../../api/fetch/usuarios";
import { useSelector } from "react-redux";
import { ResponseAxios, Usuario_INT } from "../../interface";
import { SpinnerLoader } from "../loader/spinner";
import { RootState } from "../../redux";
import Cookies from "js-cookie";

interface Props {
  visible: boolean;
  setModal: Function;
}

interface Update {
  password: string;
  newPassword: string;
}

export function UpdatePassword({ visible, setModal }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFeeedback, setIsFeeedback] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const toggle = () => setModal(!visible);

  const MyUser: Array<Usuario_INT> = useSelector(
    (state: RootState) => state.UsuarioReducer.myUser
  );
  const { handleSubmit, errors, control } = useForm<Update>();

  const send = async (data: Update) => {
    setIsLoading(true);
    setIsFeeedback("");
    const { password, newPassword } = data;
    const resClave: ResponseAxios = await UpdateClaveUser(
      MyUser[0].id_user,
      password,
      newPassword
    );

    setFeedback(resClave.respuesta.feeback);

    if (resClave.respuesta.type === "ERROR") {
      setIsFeeedback("danger");
    } else {
      setIsFeeedback("success");
      Cookies.remove("access-token");
      window.location.reload();
    }

    setIsLoading(false);
  };

  return (
    <>
      <Modal isOpen={visible} toggle={toggle}>
        <ModalHeader toggle={toggle}>Cambiar contraseña</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit(send)}>
            <FormGroup>
              <Label for="password">Mi clave:</Label>
              <Controller
                as={<Input invalid={errors.password ? true : false} />}
                type="password"
                name="password"
                control={control}
                rules={{ required: true }}
                placeholder="Ingresa tu contraseña actual"
              />
              <FormFeedback invalid={errors.password ? true : false}>
                {errors.password && "Escribe la clave actual"}
              </FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label for="cedula">Nueva clave:</Label>
              <Controller
                as={<Input invalid={errors.newPassword ? true : false} />}
                type="password"
                name="newPassword"
                control={control}
                rules={{ required: true }}
                placeholder="Ingresa tu nueva contaseña"
              />
              <FormFeedback invalid={errors.newPassword ? true : false}>
                {errors.newPassword && "Escribe la nueva contraseña"}
              </FormFeedback>
            </FormGroup>

            <Button type="submit" disabled={isLoading} color="warning" block>
              Cambiar contraseña
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
