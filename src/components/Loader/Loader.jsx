import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <div className="loader-ring"></div>
        <div className="loader-center">
          <img src="./edit-logo.png" alt="Logo" className="loader-logo" />
        </div>
        <p className="loader-text-size">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
