import React from "react";

export function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer_top">
          <div className="container">
            <div className="row">
              <div className="col-xl-3 col-md-6 col-lg-3">
                <div
                  className="footer_widget wow fadeInUp"
                  data-wow-duration="1s"
                  data-wow-delay=".3s"
                >
                  <div className="footer_logo">
                    <a href="/">
                      <img src="img/logo.png" alt="" />
                    </a>
                  </div>
                  <p>
                    lateresa@support.com <br />
                    +593 672 6782 <br />
                    600/D, Parroquia febres coordero
                  </p>
                  <div className="socail_links">
                    <ul>
                      <li>
                        <a href="/">
                          <i className="ti-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <i className="fa fa-google-plus"></i>
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <i className="fa fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <i className="fa fa-instagram"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-md-6 col-lg-2">
                <div
                  className="footer_widget wow fadeInUp"
                  data-wow-duration="1.1s"
                  data-wow-delay=".4s"
                >
                  <h3 className="footer_title">Company</h3>
                  <ul>
                    <li>
                      <a href="/contacto">Contacto</a>
                    </li>
                    <li>
                      <a href="/clientes">Afiliados</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-3 col-md-6 col-lg-3">
                <div
                  className="footer_widget wow fadeInUp"
                  data-wow-duration="1.2s"
                  data-wow-delay=".5s"
                >
                  <h3 className="footer_title">Category</h3>
                  <ul>
                    <li>
                      <a href="/">Design & Art</a>
                    </li>
                    <li>
                      <a href="/">Engineering</a>
                    </li>
                    <li>
                      <a href="/">Sales & Marketing</a>
                    </li>
                    <li>
                      <a href="/">Finance</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-4 col-md-6 col-lg-4">
                <div
                  className="footer_widget wow fadeInUp"
                  data-wow-duration="1.3s"
                  data-wow-delay=".6s"
                >
                  <h3 className="footer_title">Suscribete</h3>
                  <form action="POST" className="newsletter_form">
                    <input type="text" placeholder="Ingresa tu correo" />
                    <button type="submit">Suscribete</button>
                  </form>
                  <p className="newsletter_text">
                    Recibiras notificaciones a tu bandeja de correo electronico.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
