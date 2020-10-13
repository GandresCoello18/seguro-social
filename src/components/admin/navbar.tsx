import Cookies from "js-cookie";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { Head } from "../header/head";

interface Props {
  title: string;
}

export function NavBarAdmin({ title }: Props) {
  const cerrar_session = () => {
    Cookies.remove("access-token");
    Cookies.remove("isAdmin");
    window.location.reload();
  };

  return (
    <>
      <Head title={title} />
      <header>
        <div className="header-area" style={{ backgroundColor: "#fff" }}>
          <div id="sticky-header" className="main-header-area">
            <div className="container-fluid ">
              <div className="header_bottom_border">
                <div className="row align-items-center">
                  <div className="col-xl-3 col-lg-2">
                    <div className="logo">
                      <Link to="/administracion">
                        <img src="img/logo.png" alt="" />
                      </Link>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-7">
                    <div className="main-menu  d-none d-lg-block">
                      <nav>
                        <ul id="navigation">
                          <li>
                            <Link
                              to="/administracion"
                              style={{ color: "#000" }}
                            >
                              Inicio
                            </Link>
                          </li>
                          <li>
                            <Link to="/clientes" style={{ color: "#000" }}>
                              Afiliados
                            </Link>
                          </li>
                          <li>
                            <Link to="/personal" style={{ color: "#000" }}>
                              Medicos
                            </Link>
                          </li>
                          <li>
                            <Link to="/horario" style={{ color: "#000" }}>
                              Horarios
                            </Link>
                          </li>
                          <li>
                            <Link to="/citas" style={{ color: "#000" }}>
                              Citas
                            </Link>
                          </li>
                          <li>
                            <Link to="/pagos" style={{ color: "#000" }}>
                              Pagos
                            </Link>
                          </li>
                          <li>
                            <Link to="/mensajes" style={{ color: "#000" }}>
                              Mensajes
                            </Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 d-none d-lg-block">
                    <div className="Appointment">
                      <div className="d-none d-lg-block">
                        <Button color="danger" block onClick={cerrar_session}>
                          Cerrar Session
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mobile_menu d-block d-lg-none"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
