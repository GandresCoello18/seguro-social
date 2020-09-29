import React from "react";
import { Head } from "../header/head";
import { Link } from "react-router-dom";

interface Props {
  title: string;
}

export function NavBar({ title }: Props) {
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
                            <Link to="/cliente">Clientes</Link>
                          </li>
                          <li>
                            <Link to="/contacto">Contacto</Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-3 d-none d-lg-block">
                    <div className="Appointment">
                      <div className="d-none d-lg-block">
                        <button className="boxed-btn3">Iniciar Session</button>
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
