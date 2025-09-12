"use client";

import { useEffect, useState } from "react";
import Products from "../components/Products/Products";
import Departments from "../components/Departments/Departments";
import Header from "../components/Header/Header";
import MoreProducts from "../components/MoreProducts/MoreProducts";
import SaleProducts from "../components/SaleProducts/SaleProducts";
import HeroSection from "../components/HeroSection/HeroSection";
import SideCart from "../components/SideCart/SideCart";
import Footer from "../components/Footer/Footer";
import { getSalesProductData } from "../lib/api";
import DepartmentCard from "../components/DepartmentCard/DepartmentCard";

export default function Home() {
  const [saleBgColor, setSaleBgColor] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getSalesProductData();
      if (data?.color) {
        setSaleBgColor(data.color);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className={`main-layout`}>
        <div className="main-content">
          <HeroSection />
          <div className="main-bg">
            <Departments />
            <Products />
          </div>
          <div className="more-product-container">
            <MoreProducts />
          </div>
          <div
            className="sale-product-container"
            style={{ backgroundColor: saleBgColor }}
          >
            <SaleProducts />
          </div>

          <div className="more-product-container">
            <MoreProducts />
          </div>
          <DepartmentCard/>
          <Footer />
        </div>
        <SideCart />
      </div>
    </>
  );
}
