import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { Usuario_INT } from "../../interface";
import { Head } from "../header/head";
import { UpdatePassword } from "../client/update-password";
import { Link } from "react-router-dom";
import { ModalInicioSession } from "../header/btn-modal-inicio-session";
import { Badge, Button } from "reactstrap";
import Cookies from "js-cookie";

interface Props {
  title: string;
}

export function NavBar({ title }: Props) {
  const MyUser: Array<Usuario_INT> = useSelector(
    (state: RootState) => state.UsuarioReducer.myUser
  );

  const [visible, setVisible] = useState<boolean>(false);

  const cerrarSession = (): void => {
    Cookies.remove("access-token");
    window.location.reload();
  };

  return (
    <>
      <Head title={title} />
      <header>
        <div className="header-area ">
          <div id="sticky-header" className="main-header-area">
            <div className="container-fluid ">
              <div className="header_bottom_border">
                <div className="row align-items-center">
                  <div className="col-xl-3 col-lg-2">
                    <div className="logo">
                      <Link to="/">
                        <img src="img/logo.png" alt="" />
                      </Link>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-7">
                    <div className="main-menu  d-none d-lg-block">
                      <nav>
                        <ul id="navigation">
                          <li>
                            <Link to="/">Inicio</Link>
                          </li>
                          <li>
                            <Link to="/medicos">Medicos</Link>
                          </li>
                          <li>
                            <Link to="/contacto">Contacto</Link>
                          </li>
                          {MyUser.length > 0 && (
                            <>
                              <li>
                                <Link to="/mis-pagos">Mis Pagos</Link>
                              </li>
                              <li>
                                <Link to="/mis-citas">Mis Citas</Link>
                              </li>
                              <li>
                                <a href="#" onClick={() => setVisible(true)}>
                                  Cambiar clave
                                </a>
                              </li>
                              <UpdatePassword
                                visible={visible}
                                setModal={setVisible}
                              />
                            </>
                          )}
                        </ul>
                      </nav>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 d-none d-lg-block">
                    <div className="Appointment">
                      <div className="d-none d-lg-block">
                        {MyUser.length === 0 ? (
                          <ModalInicioSession />
                        ) : (
                          <>
                            <Badge color="secondary p-1" pill>
                              {MyUser[0].email}
                            </Badge>
                            &nbsp; &nbsp;
                            <Button color="danger" onClick={cerrarSession}>
                              Cerrar Sesion
                            </Button>
                          </>
                        )}
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
