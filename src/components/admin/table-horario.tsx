import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { ModalJornada } from "./modal-jornadas";
import { Alert, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { DOMAIN } from "../../config/domain";
import { EliminarHorariorBtn } from "./eliminar_horario";
import { Horario_INT } from "../../interface";

export function TableHorario() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const toggle = (tab: any) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const HorarioReducer: Array<Horario_INT> = useSelector(
    (state: RootState) => state.HorariosReducer.horarios
  );

  return (
    <>
      <Nav tabs>
        {[
          "Lunes",
          "Martes",
          "Miercoles",
          "Jueves",
          "Viernes",
          "Sabado",
          "Domingo",
        ].map((dia, index) => (
          <NavItem>
            <NavLink
              className={activeTab === index ? "active" : ""}
              onClick={() => {
                toggle(index);
              }}
            >
              {dia}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent activeTab={activeTab}>
        <br />
        {[
          "Lunes",
          "Martes",
          "Miercoles",
          "Jueves",
          "Viernes",
          "Sabado",
          "Domingo",
        ].map((dia, index) => (
          <TabPane tabId={index}>
            <ModalJornada dia={dia} />
            <div className="row justify-content-md-around">
              {HorarioReducer.map(
                (horario: Horario_INT) =>
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
                        <EliminarHorariorBtn id_horario={horario.id_horario} />
                      </div>
                    </div>
                  )
              )}
              {HorarioReducer.filter(
                (horario: Horario_INT) => horario.dia === dia
              ).length === 0 && (
                <Alert color="info">
                  No exiten personal asignado para ( {dia} )
                </Alert>
              )}
            </div>
          </TabPane>
        ))}
      </TabContent>
    </>
  );
}
