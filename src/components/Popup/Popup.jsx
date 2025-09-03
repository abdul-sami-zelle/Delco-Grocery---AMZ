import React from "react";
import { FiAlertTriangle } from "react-icons/fi";
import "./Popup.css";

export const ErrorPopup = ({ message, onClose }) => (
  <div className="popup-overlay">
    <div className="popup-modal">
      <div className="popup-icon">
        <FiAlertTriangle size={50} />
      </div>
      <h3>Oops!</h3>
      <p>{message}</p>
      <button onClick={onClose} className="popup-btn">Got it</button>
    </div>
  </div>
);
