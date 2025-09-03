"use client";
import React, { useState, useEffect } from "react";
import "./LocationModal.css";
import { LiaTruckMovingSolid } from "react-icons/lia";
import { CiShop } from "react-icons/ci";
import { LuSearch } from "react-icons/lu";

export const LocationModal = ({ type, onClose }) => {
  const [modalType, setModalType] = useState(type || "pickup");

  const dummyMap =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24169.29815464759!2d-74.0060156!3d40.7127281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a19d7bbf7e7%3A0x6a9d5a2b3b20fdf2!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1694269630000";

  useEffect(() => {
    if (type) {
      setModalType(type);
    }
  }, [type]);

  return (
    <div className="lm-overlay" onClick={onClose}>
      <div className="lm-content" onClick={(e) => e.stopPropagation()}>
        <button className="lm-close-btn" onClick={onClose}>
          ×
        </button>

        {modalType === "delivery" && (
          <div className="lm-delivery">
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
            <div className="lm-map">
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
            <div className="lm-btns">
              <button className="lm-cancel" onClick={onClose}>
                Cancel
              </button>
              <button className="lm-continue">Continue</button>
            </div>
          </div>
        )}

        {modalType === "pickup" && (
          <div className="lm-pickup">
            <h2>Confirm pickup location</h2>

            <div className="lm-pickup-layout">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "42%",
                }}
              >
                <div className="lm-tabs">
                  <button
                    className={modalType === "delivery" ? "active" : ""}
                    onClick={() => setModalType("delivery")}
                  >
                    <LiaTruckMovingSolid className="truck-icon" /> Delivery
                  </button>
                  <button
                    className={modalType === "pickup" ? "active" : ""}
                    onClick={() => setModalType("pickup")}
                  >
                    <CiShop className="truck-icon" /> Pickup
                  </button>
                </div>
                <div className="lm-store-list-container">
                  <div className="lm-input-wrapper">
                    <LuSearch className="lm-search-icon" />
                    <input
                      type="text"
                      placeholder="Search store"
                      className="lm-input"
                    />
                  </div>
                  <div className="lm-store-list">
                    <p>Store 1 - Manhattan, New York</p>
                    <p>Store 2 - Brooklyn, New York</p>
                    <p>Store 3 - Queens, New York</p>
                  </div>
                </div>
              </div>
              <div className="lm-map">
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationModal;
