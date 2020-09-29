import React from "react";

export function Personal() {
  return (
    <>
      <div className="featured_candidates_area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section_title text-center mb-40">
                <h3>Medicos y mas personal</h3>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((personal) => (
              <div className="col-12 col-md-4 col-lg-3 mt-2 mb-2">
                <div className="single_candidates text-center">
                  <div className="thumb">
                    <img src={`img/candiateds/${personal}.png`} alt="" />
                  </div>
                  <a href="/">
                    <h4>Markary Jondon</h4>
                  </a>
                  <p>Software Engineer</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
