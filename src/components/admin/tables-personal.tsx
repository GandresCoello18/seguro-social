import React from "react";

export function TablesPersonal() {
  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center">
          {[1, 2, 3, 4, 5, 6].map((personal) => (
            <div className="col-12 col-md-4 col-lg-3 mt-2 mb-2">
              <div className="single_candidates text-center">
                <div className="thumb">
                  <img src={`img/candiateds/${personal}.png`} alt="" />
                </div>
                <a href="/">
                  <h4>Markary Jondon</h4>
                </a>
                <p>Software Engineer</p>
                <br />
                <button className="btn btn-info">Detalles</button>
                &nbsp; &nbsp;
                <button className="btn btn-danger">Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
