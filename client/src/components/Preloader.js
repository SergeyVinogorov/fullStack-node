import React from "react";
const style = { display: "flex", justifyContent: "center", paddingTop: "2rem" };
export const Preloader = () => (
  <div style={style}>
    <div className="preloader-wrapper active">
      <div className="spinner-layer spinner-red-on ly">
        <div className="circle-clipper left">
          <div className="circle" />
        </div>
        <div className="gap-patch">
          <div className="circle" />
        </div>
        <div className="circle-clipper right">
          <div className="circle" />
        </div>
      </div>
    </div>
  </div>
);
