import React from "react";

export function SpinnerLoader() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="loader"></div>
      </div>
    </>
  );
}
