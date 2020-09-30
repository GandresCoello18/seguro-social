import React from "react";
import { NavBarAdmin } from "../components/admin/navbar";
import { SearchPersonal } from "../components/admin/searchPersonal";
import { TablesPersonal } from "../components/admin/tables-personal";

export function PersonalAdmin() {
  return (
    <>
      <NavBarAdmin title="Personal" />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <h2 className="text-center">Todo el personal</h2>

      <br />

      <section className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-md-5">
            <SearchPersonal />
          </div>
          <div className="col-12 col-md-10 text-center mt-4">
            <TablesPersonal />
          </div>
        </div>
      </section>
    </>
  );
}
