"use client";

import React, { useState } from "react";
import "./Category.css";
import { HiArrowNarrowRight } from "react-icons/hi";

const Category = () => {
  const [activeSub, setActiveSub] = useState("Featured");

  const subCategories = [
    "Featured",
    "Chicken",
    "Beef",
    "Seafood",
    "Pork",
    "Turkey",
    "Bacon",
    "Sausage",
    "Hot Dogs & Franks",
    "Deli Meats",
    "Frozen Meats",
    "Frozen Seafood",
    "Meat Substitutes",
  ];

  return (
    <>
      <div style={{ backgroundColor: "white" }}>
        <div className="category-header">
          <div className="category-Image-with-name">
            <img src="/assets/Images/depart1.png" alt="" />
            <span>Meat & Seafood</span>
          </div>
          <span className="next-aisle-btn">
            Next Aisle <HiArrowNarrowRight />
          </span>
        </div>
        <div className="sub-categories-container">
          {subCategories.map((item, index) => (
            <span
              key={index}
              className={activeSub === item ? "active" : ""}
              onClick={() => setActiveSub(item)}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      <div style={{ width: "80%", margin: "auto" }}>
        <div className="catory-slider">
          <div className="category-slider-left-section">
            <span>Pre Brand</span>
            <h1>High protein, 100% grass-fed beef ›</h1>
          </div>
          <div className="category-slider-right-section">
            <img src="/assets/Images/catSlider1.jpg" alt="" />
          </div>
        </div>
        <div>
            
        </div>
      </div>
    </>
  );
};

export default Category;
