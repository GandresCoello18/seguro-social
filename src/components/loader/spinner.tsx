import React from "react";
import { Spinner } from "reactstrap";

export function SpinnerLoader() {
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Spinner style={{ width: "3rem", height: "3rem" }} type="grow" />
      </div>
    </>
  );
}
