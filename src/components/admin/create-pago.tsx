import React, { useState, useEffect } from "react";
import { CreatePago } from "../../api/fetch/pagos";
import { Usuario_INT, ResponseAxios, Pago_INT } from "../../interface";
import { useSelector, useDispatch } from "react-redux";
import { SetPagos } from "../../redux/modulos/pagos";
import { RootState, Dispatch } from "../../redux";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Alert,
} from "reactstrap";
import { SpinnerLoader } from "../loader/spinner";
import { fecha_actual } from "../../hooks/fecha";

interface Pago {
  id_user: string;
  monto: number;
  metodo: string;
}

export function CreatePagoModal() {
  const dispatch: Dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFeeedback, setIsFeeedback] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const [myIdUser, setMyIdUser] = useState<string>("");
  const toggle = () => {
    setModal(!modal);
    setIsFeeedback("");
  };

  const UsuarioReducer = useSelector(
    (state: RootState) => state.UsuarioReducer
  );
  const PagosReducer = useSelector((state: RootState) => state.PagosReducer);

  const { control, handleSubmit, errors, register } = useForm<Pago>();

  useEffect(() => {
    if (UsuarioReducer.myUser.length > 0) {
      setMyIdUser(UsuarioReducer.myUser[0].id_user);
    }
  }, [UsuarioReducer]);

  const send = async (data: Pago) => {
    setIsFeeedback("");
    setIsLoading(true);

    let fecha_pago: string | Date | number;

    const susPagos = PagosReducer.pagos
      .reverse()
      .filter((pago: Pago_INT) => pago.id_user === data.id_user);

    if (susPagos.length === 0) {
      fecha_pago = fecha_actual();
    } else {
      const ultimo_pago: string = susPagos[susPagos.length - 1].fecha_pago;
      fecha_pago = new Date(ultimo_pago).setMonth(
        new Date(ultimo_pago).getMonth() + 1
      );
      fecha_pago = new Date(fecha_pago);
    }

    const resPayment: ResponseAxios = await CreatePago(
      fecha_pago,
      data.metodo,
      data.monto,
      data.id_user,
      true
    );

    if (resPayment.respuesta.type === "ERROR") {
      setIsFeeedback("danger");
      setFeedback(resPayment.respuesta.feeback);
    } else {
      setIsFeeedback("success");
      setFeedback(`Pago realizado`);
      setModal(false);
      dispatch(SetPagos([...PagosReducer.pagos, ...resPayment.axios.data]));
    }

    setIsLoading(false);
  };

  return (
    <>
      <Button color="primary" onClick={toggle}>
        Registrar Pago
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Registrar Pago</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit(send)}>
            <FormGroup>
              <Label for="cedula">Usuario:</Label>
              <select
                name="id_user"
                className="form-control"
                ref={register({ required: true })}
              >
                {UsuarioReducer.usuarios
                  .filter((user: Usuario_INT) => user.id_user !== myIdUser)
                  .map((user: Usuario_INT) => (
                    <option key={user.id_user} value={user.id_user}>
                      {user.cedula} - {user.email}
                    </option>
                  ))}
              </select>
              <FormFeedback invalid={errors.id_user ? true : false}>
                {errors.id_user && "Escribe tu numero de indentificacion"}
              </FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label for="cedula">Metodo:</Label>
              <select
                name="metodo"
                className="form-control"
                ref={register({ required: true })}
              >
                <option value="Efectivo">Efectivo</option>
                <option value="Trasferencia">Trasferencia</option>
                <option value="Tarjeta de credito">Tarjeta de credito</option>
              </select>
              <FormFeedback invalid={errors.id_user ? true : false}>
                {errors.id_user && "Escribe tu numero de indentificacion"}
              </FormFeedback>
            </FormGroup>

            <FormGroup>
              <Label for="email">Monto:</Label>
              <Controller
                as={<Input invalid={errors.monto ? true : false} />}
                type="number"
                name="monto"
                control={control}
                rules={{ required: true }}
                placeholder="Ingresa el monto a pagar"
              />
              <FormFeedback invalid={errors.monto ? true : false}>
                {errors.monto && "Escribe el monto a pagar"}
              </FormFeedback>
            </FormGroup>

            <Button type="submit" color="info" block>
              Guardar Pago
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
