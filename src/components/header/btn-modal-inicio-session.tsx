import React, { useState } from "react";
import { LoginForm } from "./login";
import { RegistroForm } from "./registro";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export function ModalInicioSession() {
  const [visibleLogin, setVisibleLogin] = useState<boolean>(false);
  const [visibleRegistro, setVisibleRegitro] = useState<boolean>(false);

  return (
    <>
      <button className="boxed-btn3" onClick={() => setVisibleLogin(true)}>
        Iniciar Session
      </button>

      <Modal
        isOpen={visibleLogin}
        toggle={() => setVisibleLogin(!visibleLogin)}
      >
        <ModalHeader toggle={() => setVisibleLogin(!visibleLogin)}>
          Iniciar Session
        </ModalHeader>
        <ModalBody>
          <LoginForm />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => setVisibleRegitro(true)}>
            Crear cuenta !
          </Button>{" "}
          <Button color="danger" onClick={() => setVisibleLogin(false)}>
            Salir
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={visibleRegistro}
        tRegistroFormoggle={() => setVisibleRegitro(!visibleRegistro)}
      >
        <ModalHeader toggle={() => setVisibleRegitro(!visibleRegistro)}>
          Crear cuenta...!
        </ModalHeader>
        <ModalBody>
          <RegistroForm setVisibleRegitro={setVisibleRegitro} />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => setVisibleRegitro(false)}>
            Salir
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
