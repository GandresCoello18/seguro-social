import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export function Portada() {
  const [modal, setModal] = useState<boolean>(false);

  const toggle = () => setModal(!modal);

  return (
    <>
      <div className="slider_area">
        <div className="single_slider  d-flex align-items-center slider_bg_1">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-7 col-md-6">
                <div className="slider_text">
                  <h5
                    className="wow fadeInLeft"
                    data-wow-duration="1s"
                    data-wow-delay=".2s"
                  >
                    436 Afiliados
                  </h5>
                  <h3
                    className="wow fadeInLeft"
                    data-wow-duration="1s"
                    data-wow-delay=".3s"
                  >
                    Seguro social
                  </h3>
                  <p
                    className="wow fadeInLeft"
                    data-wow-duration="1s"
                    data-wow-delay=".4s"
                  >
                    Seguro social campesino, "La Teresa"
                  </p>
                  <div
                    className="sldier_btn wow fadeInLeft"
                    data-wow-duration="1s"
                    data-wow-delay=".5s"
                  >
                    <button onClick={toggle} className="boxed-btn3">
                      Requisitos para mi seguro
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="ilstration_img wow fadeInRight d-none d-lg-block text-right"
          data-wow-duration="1s"
          data-wow-delay=".2s"
        >
          <img src="img/banner/illustration.png" alt="" />
        </div>
      </div>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Requisitos para seguro</ModalHeader>
        <ModalBody>
          <p>
            Para tramitar su seguro social campesino, necesita cumplir con estos
            requerimiento.
          </p>
          <ol>
            <li>
              Ser obrero o trabajar de agricultura y ganaderia actualmente
            </li>
            <li>No contener RUT</li>
            <li>Datos personales como ( Nombres y apellidos, ect )</li>
            <li>Dirección o lugar de recidencia</li>
            <li>Copia de cedula y papel de votación</li>
            <li>Cancelar 20 dolares de la inscripción</li>
          </ol>
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
