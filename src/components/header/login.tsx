import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AccessLogin } from "../../api/fetch/login";
import { TokenLife } from "../../api/fetch/login";
import { useHistory } from "react-router-dom";
import { Dispatch } from "../../redux";
import { SetMyUser } from "../../redux/modulos/usuarios";
import { useDispatch } from "react-redux";
import { ResponseAxios } from "../../interface";
import { SpinnerLoader } from "../../components/loader/spinner";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
  Alert,
} from "reactstrap";
import Cookies from "js-cookie";

interface Login {
  email: string;
  password: string;
}

export function LoginForm() {
  const { control, handleSubmit, errors } = useForm<Login>();
  const dispatch: Dispatch = useDispatch();
  const history = useHistory<typeof useHistory>();
  const [feedback, setFeedback] = useState<string>("");
  const [isFeeedback, setIsFeedback] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const send = async (data: Login) => {
    setIsFeedback("");
    setIsLoading(true);

    const { email, password } = data;

    try {
      const resLogin: ResponseAxios = await AccessLogin(email, password);

      if (resLogin.respuesta.type === "ERROR") {
        setIsFeedback("danger");
        setFeedback(resLogin.respuesta.feeback);
      } else {
        const myUser: ResponseAxios = await TokenLife(
          resLogin.axios.data.token
        );

        if (myUser.respuesta.type === "ERROR") {
          setIsFeedback("danger");
          setFeedback(myUser.respuesta.feeback);
        } else {
          Cookies.set("access-token", resLogin.axios.data.token);
          Cookies.set("isAdmin", myUser.axios.data.myUser[0].admin);
          dispatch(SetMyUser([...myUser.axios.data.myUser]));
          history.push("/mis-pagos");
        }
      }
      setIsLoading(false);
    } catch (error) {
      setFeedback(error.message);
    }

    setIsLoading(false);
  };

  return (
    <>
      <Form onSubmit={handleSubmit(send)}>
        <FormGroup>
          <Label for="email">Email:</Label>
          <Controller
            as={Input}
            type="email"
            name="email"
            control={control}
            rules={{ required: true }}
            placeholder="Ingresa tu email"
          />
          <FormFeedback invalid={errors.email ? true : false}>
            {errors.email && "Escribe tu direccion de correo"}
          </FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="password">Contraseña:</Label>
          <Controller
            as={Input}
            type="password"
            name="password"
            control={control}
            rules={{ required: true }}
            placeholder="Ingresa tu contraseña"
          />
          <FormFeedback invalid={errors.password ? true : false}>
            {errors.password && "Escribe tu contraseña"}
          </FormFeedback>
        </FormGroup>

        <Button type="submit" color="info" block>
          Entrar
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
