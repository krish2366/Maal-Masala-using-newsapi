import React from "react";
import Loader from "./loader.gif";
const Spinner = () => {
  return (
    <div className="text-center">
      <img src={Loader} alt="loading..." />
    </div>
  );
};

export default Spinner;
