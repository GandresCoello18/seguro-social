import React, { useState, useEffect } from "react";
import { CreatePago } from "../../api/fetch/pagos";
import { Usuario_INT, ResponseAxios, Pago_INT } from "../../interface";
import { useSelector, useDispatch } from "react-redux";
import { SetPagos } from "../../redux/modulos/pagos";
import { RootState, Dispatch } from "../../redux";
import { useForm } from "react-hook-form";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  FormFeedback,
  Alert,
  Badge,
} from "reactstrap";
import { SpinnerLoader } from "../loader/spinner";
import { diferencia_de_meses, incrementarMes } from "../../hooks/fecha";
import moment from "moment";

interface Pago {
  id_user: string;
  metodo: string;
}

export function CreatePagoModal() {
  const dispatch: Dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFeeedback, setIsFeeedback] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const [myIdUser, setMyIdUser] = useState<string>("");
  const [fecha_pago, setFecha_pago] = useState<Date | number>(0);
  const [pagosAtrasado, setPagoAtrasado] = useState<number>(0);
  const toggle = () => {
    setModal(!modal);
    setIsFeeedback("");
  };

  const UsuarioReducer = useSelector(
    (state: RootState) => state.UsuarioReducer
  );
  const PagosReducer = useSelector((state: RootState) => state.PagosReducer);

  const { handleSubmit, errors, register } = useForm<Pago>();

  useEffect(() => {
    if (UsuarioReducer.myUser.length > 0) {
      setMyIdUser(UsuarioReducer.myUser[0].id_user);
    }
  }, [UsuarioReducer]);

  const send = async (data: Pago) => {
    setIsFeeedback("");
    setIsLoading(true);

    /*let fecha_pago: string | Date | number;

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
    }*/

    const resPayment: ResponseAxios = await CreatePago(
      moment(new Date(fecha_pago)).format(),
      data.metodo,
      5,
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

  const selectUser = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const select_user: string = event.target.value;
    const user: Usuario_INT = UsuarioReducer.usuarios.find(
      (user: Usuario_INT) => user.id_user === select_user
    );
    const userPago: Array<Pago_INT> = PagosReducer.pagos.filter(
      (pago: Pago_INT) => pago.id_user === select_user
    );

    let date_pago;
    let thisMes: any;
    if (userPago.length === 0) {
      thisMes = user.fecha_registro;
      date_pago = incrementarMes(thisMes);
      setFecha_pago(date_pago);
    } else {
      const ultimo_pago: string = userPago.reverse()[userPago.length - 1]
        .fecha_pago;
      thisMes = ultimo_pago;
      date_pago = incrementarMes(ultimo_pago);
      setFecha_pago(date_pago);
    }
    let meses_atrasos = diferencia_de_meses(thisMes);
    setPagoAtrasado(Math.abs(meses_atrasos));
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
                onChange={selectUser}
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

            <div
              style={{
                padding: 5,
                border: 2,
                borderRadius: 10,
                borderStyle: "solid",
                borderColor: "reyalblue",
              }}
            >
              {fecha_pago === 0 ? (
                <Alert color="info">Selecciona un afiliado...</Alert>
              ) : (
                <>
                  <p style={{ fontSize: 20 }}>
                    Siguiente Pago:{" "}
                    <Badge color="warning">
                      {moment(new Date(fecha_pago)).format("LL")}
                    </Badge>
                  </p>
                  <p style={{ fontSize: 20 }}>
                    Pagos Atrasados:{" "}
                    <Badge color={pagosAtrasado > 0 ? "danger" : "success"}>
                      {pagosAtrasado?.toFixed()}
                    </Badge>
                  </p>
                </>
              )}
            </div>

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
              <FormFeedback invalid={errors.metodo ? true : false}>
                {errors.metodo && "Selecciona el metodo de pago"}
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
