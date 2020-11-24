import React from "react";
import { TablesPersonal } from "../components/admin/tables-personal";
import { NavBar } from "../components/layout/navbar";

export function MedicosPage() {
  return (
    <>
      <NavBar title="Medicos" />
      <div className="bradcam_area bradcam_bg_1">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="bradcam_text">
                <h3>Medicos y mas personal</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />

      <section className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 text-center mt-4">
            <TablesPersonal />
          </div>
        </div>
      </section>
    </>
  );
}
