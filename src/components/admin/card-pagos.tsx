import React from "react";

export function CardPagos() {
  return (
    <>
      {[0, 1, 2, 3, 4, 5, 6].map((pago) => (
        <div className="col-lg-4 col-xl-3 col-md-6" key={pago}>
          <div className="single_catagory">
            <a href="jobs.html">
              <h4>Design & Creative</h4>
            </a>
            <p>
              {" "}
              <span>50</span> Available position
            </p>
            <br />
            <button className="btn btn-info form-control">Detalles</button>
          </div>
        </div>
      ))}
    </>
  );
}
