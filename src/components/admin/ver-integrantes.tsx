import moment from "moment";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Alert,
  Badge,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap";
import { ValidateStatusUser } from "../../hooks/color-row-user";
import { Grupo_afiliados_INT } from "../../interface";
import { EliminarGrupoBtn } from "./eliminar-grupo";
import { RootState } from "../../redux";

interface Props {
  id_afiliado: string;
  isReload: boolean;
}

export function VerIntegrantes({ id_afiliado, isReload }: Props) {
  const [modal, setModal] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");
  const toggle = () => setModal(!modal);
  const [integrantes, setIntegrantes] = useState<Array<Grupo_afiliados_INT>>(
    []
  );

  const Grupos: Array<Grupo_afiliados_INT> = useSelector(
    (state: RootState) => state.GruposReducer.grupos
  );

  useEffect(() => {
    const FindIntegrantes = Grupos.filter(
      (grupo) => grupo.id_user === id_afiliado
    );
    setIntegrantes(FindIntegrantes);

    if (isReload) {
      setFeedback("SE ACTUALIZARON LOS INTEGRANTES.");
    }
  }, [Grupos, isReload, id_afiliado]);

  return (
    <>
      <Button color="primary" onClick={toggle}>
        Integrantes
      </Button>
      <Modal isOpen={modal} size="lg" toggle={toggle}>
        <ModalHeader toggle={toggle}>Sus integrantes</ModalHeader>
        <ModalBody>
          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
                <th>Nombres</th>
                <th>Apellido</th>
                <th>Familiar</th>
                <th>Fecha nacimiento</th>
                <th>Estado</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {integrantes.map((integrante) => (
                <tr key={integrante.id_grupo}>
                  <td>{integrante.nombres}</td>
                  <td>{integrante.apellidos}</td>
                  <td>{integrante.tipo_familiar}</td>
                  <td>{moment(integrante.fecha_nacimiento).format("LL")}</td>
                  <td>
                    <Badge
                      style={{ fontSize: 17 }}
                      color={ValidateStatusUser(integrante.status_grupo)}
                    >
                      {integrante.status_grupo}
                    </Badge>
                  </td>
                  <td>
                    <EliminarGrupoBtn id_grupo={Number(integrante.id_grupo)} />
                  </td>
                </tr>
              ))}

              {integrantes.length === 0 && (
                <Alert color="info">
                  No existen integrantes para este afiliado.
                </Alert>
              )}
            </tbody>
          </Table>

          <br />

          {feedback && <Alert color="info">{feedback}</Alert>}
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
