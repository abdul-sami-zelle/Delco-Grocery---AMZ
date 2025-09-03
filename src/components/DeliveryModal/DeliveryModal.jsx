"use client";
import React, { useState } from "react";
import "./DeliveryModal.css";
import { LuSearch } from "react-icons/lu";

const DeliveryModal = ({ onClose }) => {
  // Dummy USA map (New York, USA)
  const dummyMap =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24169.29815464759!2d-74.0060156!3d40.7127281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a19d7bbf7e7%3A0x6a9d5a2b3b20fdf2!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1694269630000";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="location-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <div className="delivery-modal">
          <h2>Set your Location</h2>
          <div style={{ width: "100%", padding: "0 15px 15px 15px" }}>
            <div className="lm-input-wrapper">
              <LuSearch className="lm-search-icon" />
              <input
                type="text"
                placeholder="Enter your location"
                className="lm-input"
              />
            </div>
          </div>
          <div className="map-container">
            <iframe
              src={dummyMap}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map"
            ></iframe>
          </div>
          <div className="btn-containerrr">
            <button className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button className="delivery-modal-continue-btn">Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryModal;
