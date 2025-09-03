"use client";
import React, { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getLandingPageData } from "../../lib/api";
import "./Departments.css";

const Departments = () => {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await getLandingPageData();
      if (data && data.featured_depts) {
        setDepartments(data.featured_depts);
      }
      setLoading(false);
    }
    fetchData();
  }, []);


  useEffect(() => {
    const checkOverflow = () => {
      if (scrollRef.current) {
        setIsOverflowing(
          scrollRef.current.scrollWidth > scrollRef.current.clientWidth
        );
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [departments, loading]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -clientWidth : clientWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className="department_wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && isOverflowing && !loading && (
        <button className="arrow left" onClick={() => scroll("left")}>
          <FaChevronLeft />
        </button>
      )}

      <div className="department_container" ref={scrollRef}>
        {loading
          ? Array.from({ length: 10 }).map((_, i) => (
              <div className="department-cards shimmer" key={i}>
                <div className="department-Image shimmer-img"></div>
                <div className="department-name shimmer-text"></div>
              </div>
            ))
          : departments.map((dept) => (
              <div className="department-cards" key={dept._id}>
                <div className="department-Image">
                  <img
                    src={`https://api.delcofarmersmarket.com${dept.image_2}`}
                    alt={dept.name}
                  />
                </div>
                <p className="department-name">{dept.name}</p>
              </div>
            ))}
      </div>

      {isHovered && isOverflowing && !loading && (
        <button className="arrow right" onClick={() => scroll("right")}>
          <FaChevronRight />
        </button>
      )}
    </div>
  );
};

export default Departments;
