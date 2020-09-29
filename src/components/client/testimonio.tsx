import React from "react";

export function Testimonio() {
  return (
    <>
      <div className="testimonial_area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section_title text-center mb-40">
                <h3>Testimonio</h3>
              </div>
            </div>
            <div className="col-xl-12">
              <div className="single_carousel">
                <div className="row">
                  <div className="col-lg-11">
                    <div className="single_testmonial d-flex align-items-center">
                      <div className="thumb">
                        <img src="img/testmonial/author.png" alt="" />
                        <div className="quote_icon">
                          <i className="Flaticon flaticon-quote"></i>
                        </div>
                      </div>
                      <div className="info">
                        <p>
                          Ahora desde la comodidad de mi hogar u oficina puedo
                          seguir pagando mensualmente el seguro social, me ha
                          resultado muy util y ahorro mucho tiempo, gracias al
                          seguro campesino "La Teresa".
                        </p>
                        <span>- Miguel ortega</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
