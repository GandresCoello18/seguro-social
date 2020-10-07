import React from "react";

export function Portada() {
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
                    436 clientes
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
                    Seguro social campecino, "La Teresa"
                  </p>
                  <div
                    className="sldier_btn wow fadeInLeft"
                    data-wow-duration="1s"
                    data-wow-delay=".5s"
                  >
                    <a
                      href="http://www.ecuadorlegalonline.com/laboral/afiliacion-al-iess/"
                      target="_blank"
                      className="boxed-btn3"
                    >
                      Empezar con mi seguro
                    </a>
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
    </>
  );
}
