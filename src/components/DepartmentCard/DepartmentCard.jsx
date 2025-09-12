"use client";
import React, { useEffect, useState } from "react";
import "./DepartmentCard.css";
import { getDepartments } from "../../lib/api";

const DepartmentCard = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDepartments() {
      const data = await getDepartments(1, "asc");
      setDepartments(data);
      setLoading(false);
    }
    fetchDepartments();
  }, []);

  return (
    <div className="department-container">
      {loading
        ? Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="shimmer-card">
              <div className="shimmer-box"></div>
              <div className="shimmer-text"></div>
            </div>
          ))
        : departments.map((dept) => (
            <div key={dept._id} className="department-card">
              <img
                src={`https://api.delcofarmersmarket.com${dept.card_image}`}
                alt={dept.name}
                className="department-img"
              />
              <h3>{dept.name}</h3>
            </div>
          ))}
    </div>
  );
};

export default DepartmentCard;
