"use client";
import React from "react";
import "./HeroSection.css";
import { useState, useEffect, useRef, useContext } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";

const HeroSection = () => {
  const slides = [
    "/assets/Images/slider1.jpg",
    "/assets/Images/slider2.gif",
    "/assets/Images/slider3.jpg",
    "/assets/Images/slider4.jpg",
  ];

  const [index, setIndex] = useState(1);
  const [transition, setTransition] = useState(true);

  const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    setIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    if (index === extendedSlides.length - 1) {
      setTransition(false);
      setIndex(1);
    }
    if (index === 0) {
      setTransition(false);
      setIndex(slides.length);
    }
  };

  useEffect(() => {
    if (!transition) {
      requestAnimationFrame(() => setTransition(true));
    }
  }, [transition]);
  return (
    <div className="slider-container">
      <div className="slider-left">
        <div className="slider">
          <div
            className="slides"
            style={{
              transform: `translateX(-${index * 100}%)`,
              transition: transition ? "transform 0.5s ease-in-out" : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedSlides.map((src, i) => (
              <img key={i} src={src} alt={`slide-${i}`} />
            ))}
          </div>

          <button className="arrow left" onClick={prevSlide}>
            <FaChevronLeft />
          </button>
          <button className="arrow right" onClick={nextSlide}>
            <FaChevronRight />
          </button>

          <div className="dots">
            {slides.map((_, i) => (
              <span
                key={i}
                className={`dot ${index === i + 1 ? "active" : ""}`}
                onClick={() => setIndex(i + 1)}
              ></span>
            ))}
          </div>
        </div>
      </div>

      <div className="slider-right">
        <div className="promo-card">
          <div className="promo-text">
            <h3>
              Taste What's <br /> in Season <MdKeyboardArrowRight />
            </h3>
          </div>
          <div className="promo-img">
            <img src="/assets/Images/sideImg1.png" alt="deal" />
          </div>
        </div>
        <div className="promo-card">
          <div className="promo-text2">
            <h3>
              Take a snack <br /> and sip break <MdKeyboardArrowRight />
            </h3>
          </div>
          <div className="promo-img">
            <img src="/assets/Images/sideImg2.jpg" alt="deal" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
