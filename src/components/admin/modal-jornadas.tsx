import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Alert,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import { DOMAIN } from "../../config/domain";
import { Horario_INT } from "../../interface";
import { RootState } from "../../redux";

interface Props {
  dia: string;
}

export function ModalJornada({ dia }: Props) {
  const [modal, setModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<number>(0);

  const toggle = (tab: any) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const toggleModal = () => setModal(!modal);

  const HorarioReducer: Array<Horario_INT> = useSelector(
    (state: RootState) => state.HorariosReducer.horarios
  );

  return (
    <>
      <Button color="danger" onClick={toggleModal} className="m-4">
        Jornadas de {dia}
      </Button>
      <Modal isOpen={modal} size="lg" toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Jornadas</ModalHeader>
        <ModalBody>
          <Nav tabs>
            {["Mañana", "Tarde", "Noche"].map((jornada, index) => (
              <NavItem>
                <NavLink
                  className={activeTab === index ? "active" : ""}
                  onClick={() => {
                    toggle(index);
                  }}
                >
                  {jornada}
                </NavLink>
              </NavItem>
            ))}
          </Nav>

          <TabContent activeTab={activeTab}>
            <br />
            {["Mañana", "Tarde", "Noche"].map((jornada, index) => (
              <TabPane tabId={index}>
                <div className="row justify-content-md-around">
                  {HorarioReducer.map(
                    (horario: Horario_INT) =>
                      horario.jornada === jornada &&
                      horario.dia === dia && (
                        <div className="col-12 col-md-5">
                          <div className="single_candidates text-center">
                            <div className="thumb">
                              <img
                                src={`${DOMAIN}/static/personal/${horario.imagen}`}
                                alt={horario.nombres + " " + horario.apellido}
                              />
                            </div>
                            <a href="/">
                              <h4>
                                {horario.nombres} {horario.apellido}
                              </h4>
                            </a>
                            <p>{horario.cargo}</p>
                          </div>
                        </div>
                      )
                  )}
                  {HorarioReducer.filter(
                    (horario: Horario_INT) => horario.jornada === jornada
                  ).length === 0 && (
                    <Alert color="info">
                      No exiten personal asignado para ( {jornada} )
                    </Alert>
                  )}
                </div>
              </TabPane>
            ))}
          </TabContent>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Salir
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
