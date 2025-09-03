// "use client";

// import Products from "../components/Products/Products";
// import Departments from "../components/Departments/Departments";
// import Header from "../components/Header/Header";
// import MoreProducts from "../components/MoreProducts/MoreProducts";
// import SaleProducts from "../components/SaleProducts/SaleProducts";
// import HeroSection from "../components/HeroSection/HeroSection";
// import SideCart from "../components/SideCart/SideCart";
// import Footer from "../components/Footer/Footer";

// export default function Home() {
//   return (
//     <>
//       <Header />
//       <div className={`main-layout`}>
//         <div className="main-content">
//           <HeroSection />
//           <div className="main-bg">
//             <Departments />
//             <Products />
//           </div>
//           <div className="more-product-container">
//             <MoreProducts />
//           </div>
//           <div className="sale-product-container">
//             <SaleProducts />
//           </div>
//           <div className="more-product-container">
//             <MoreProducts />
//           </div>
//           <Footer />
//         </div>
//         <SideCart />
//       </div>
//     </>
//   );
// }
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
import { getSalesProductData } from "../lib/api"; // yaha aapka fetch function rakha hai

export default function Home() {
  const [saleBgColor, setSaleBgColor] = useState(""); // default color

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
          
          {/* sale-product-container with dynamic background */}
          <div
            className="sale-product-container"
            style={{ backgroundColor: saleBgColor }}
          >
            <SaleProducts />
          </div>

          <div className="more-product-container">
            <MoreProducts />
          </div>
          <Footer />
        </div>
        <SideCart />
      </div>
    </>
  );
}
