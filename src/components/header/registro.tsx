import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { CreateCountUser } from "../../api/fetch/usuarios";
import { ResponseAxios, Usuario_INT } from "../../interface";
import { SpinnerLoader } from "../loader/spinner";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Alert,
  FormFeedback,
} from "reactstrap";

interface Registro {
  cedula: number;
  email: string;
  password: string;
  confir_password: string;
}

interface Props {
  setVisibleRegitro: Function;
}

export function RegistroForm({ setVisibleRegitro }: Props) {
  const { handleSubmit, control, errors } = useForm<Registro>();
  const [feedback, setFeedback] = useState<string>("");
  const [isFeeedback, setIsFeedback] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: Registro) => {
    setIsFeedback("");
    setIsLoading(true);

    const { cedula, confir_password, email, password } = data;

    try {
      if (password === confir_password) {
        if (password.length >= 7) {
          const user: Usuario_INT = {
            id_user: "",
            cedula,
            email,
            password,
            status: "",
            nombres: "",
            apellidos: "",
            sexo: "",
            fecha_nacimiento: "",
          };

          const CreateUser: ResponseAxios = await CreateCountUser(user);

          if (CreateUser.respuesta.type === "ERROR") {
            setIsFeedback("danger");
            setFeedback(CreateUser.respuesta.feeback);
          } else {
            setIsFeedback("success");
            setFeedback("Se creo el usuario correctamente");

            setTimeout(() => {
              setVisibleRegitro(false);
            }, 2000);
          }
        } else {
          setIsFeedback("danger");
          setFeedback("Las contraseñas deben de tener 7 o mas caracteres");
        }
      } else {
        setIsFeedback("danger");
        setFeedback("Las contraseñas no son iguales");
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
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="email">Cedula:</Label>
          <Controller
            as={<Input invalid={errors.cedula ? true : false} />}
            type="number"
            name="cedula"
            control={control}
            rules={{ required: true }}
            placeholder="Ingresa tu numero de cedula"
          />
          <FormFeedback invalid={errors.cedula ? true : false}>
            {errors.cedula && "Escribe tu numero de indentificacion"}
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
            placeholder="Ingresa tu email"
          />
          <FormFeedback invalid={errors.email ? true : false}>
            {errors.email && "Escribe una direccion de correo valida"}
          </FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="password">contraseña:</Label>
          <Controller
            as={<Input invalid={errors.password ? true : false} />}
            type="password"
            name="password"
            control={control}
            rules={{ required: true }}
            placeholder="Ingresa una clave con 7 o mas caracteres"
          />
          <FormFeedback invalid={errors.password ? true : false}>
            {errors.password && "Escribe una contraseña"}
          </FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="password">confir contraseña:</Label>
          <Controller
            as={<Input invalid={errors.confir_password ? true : false} />}
            type="password"
            name="confir_password"
            control={control}
            rules={{ required: true }}
            placeholder="Vuelve ha escribir la contraseña"
          />
          <FormFeedback invalid={errors.confir_password ? true : false}>
            {errors.confir_password && "Vulve ha escribe la contraseña"}
          </FormFeedback>
        </FormGroup>

        <Button type="submit" disabled={isLoading} color="primary" block>
          Registrarme
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
