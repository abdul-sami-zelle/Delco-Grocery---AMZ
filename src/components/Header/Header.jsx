"use client";
import { useState, useEffect, useRef, useContext } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { RiAccountCircleLine } from "react-icons/ri";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { LiaTruckMovingSolid } from "react-icons/lia";
import "./Header.css";
import { CartContext } from "../../context/addToCart";
import { IoMdArrowDropdown } from "react-icons/io";
import { getLandingPageData } from "@/lib/api";
import LocationModal from "../LocationModal/LocationModal";
import DeliveryModal from "../DeliveryModal/DeliveryModal";

export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showDelcoMenu, setShowDelcoMenu] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Delco Farmers");
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState(null);

  const slides = [
    "/assets/Images/slider1.jpg",
    "/assets/Images/slider2.gif",
    "/assets/Images/slider3.jpg",
    "/assets/Images/slider4.jpg",
  ];

  const categories = [
    "Produce",
    "Dairy & Eggs",
    "Meat & Seafood",
    "Pantry",
    "Beverages",
    "Frozen",
    "Snacks, Candy, Nuts, & Seeds",
    "Baby",
    "Beauty & Personal Care",
    "Bulk Goods",
  ];

  const { showSideCart, setShowSideCart, cart } = useContext(CartContext);

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
    const handleScroll = () => {
      const sideCart = document.querySelector(".side-cart-contaner");
      if (!sideCart) return;

      if (window.scrollY > 80) {
        sideCart.classList.add("sidecart-scrolled");
      } else {
        sideCart.classList.remove("sidecart-scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [showSideCart]);

  useEffect(() => {
    if (!transition) {
      requestAnimationFrame(() => setTransition(true));
    }
  }, [transition]);

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
  return (
    <>
      <header className="header">
        <div className="topbar-container">
          <div className="topbar">
            <div className="hamburger-with-heading">
              <div className="hamburger-btn">
                <button
                  className="hamburger"
                  onClick={() => setShowSidebar(true)}
                >
                  <HiMenuAlt1 />
                </button>
              </div>
              <div className="">
                <img
                  src="/assets/Images/header-logo.png"
                  className="header-logo"
                  alt=""
                />
              </div>
              <div className="search-container">
                <span
                  className="delco-fresh-btn"
                  onClick={() => setShowDelcoMenu((prev) => !prev)}
                >
                  {selectedCategory} <IoMdArrowDropdown />
                </span>
                <input type="text" placeholder="Delco Search" />
                <span className="search-icon">
                  <IoSearch size={20} />
                </span>
                {showDelcoMenu && (
                  <div className="delco-menu">
                    <ul>
                      {categories.map((item, i) => (
                        <li
                          key={i}
                          onClick={() => {
                            setSelectedCategory(item);
                            setShowDelcoMenu(false);
                          }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="topbar-right">
              <RiAccountCircleLine size={30} color="#ffff" />
              {!showSideCart && (
                <MdOutlineShoppingCart
                  size={30}
                  color="#fff"
                  onClick={() => setShowSideCart(true)}
                />
              )}
            </div>
          </div>
        </div>
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
              <button
                className="modal-close"
                aria-label="Close"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>

              <div className="modal-head-center">
                <img src="/assets/Images/logo.png" alt="Delco Farmers Market" />
                <h2>Delco Farmers Market</h2>
                <p className="subtext">Fresh • Quality • Local</p>
              </div>

              <p className="modal-intro">
                We’re a neighborhood market focused on fresh produce, trusted
                meats, and everyday essentials — delivered to your door or ready
                for pickup. No fluff, just good food you can count on.
              </p>

              <div className="modal-grid">
                <div className="modal-item">
                  <h4>What we do</h4>
                  <ul>
                    <li>Daily-picked fruits & vegetables</li>
                    <li>Halal-certified meats & pantry</li>
                    <li>Fresh bakery & ready meals</li>
                    <li>Delivery & curbside pickup</li>
                  </ul>
                </div>
                <div className="modal-item">
                  <h4>Store hours</h4>
                  <ul>
                    <li>Mon–Sat: 8:00 AM – 9:00 PM</li>
                    <li>Sunday: 9:00 AM – 7:00 PM</li>
                    <li>Same-day delivery (selected areas)</li>
                  </ul>
                </div>
              </div>

              <div className="modal-cta">
                <button
                  className="btn-primary"
                  onClick={() => setShowModal(false)}
                >
                  Start Shopping
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        {showSidebar && (
          <div
            className="sidebar-overlay"
            onClick={() => setShowSidebar(false)}
          >
            <div className="sidebar" onClick={(e) => e.stopPropagation()}>
              <div className="sidebar-header">
                <img src="/assets/Images/logo.png" alt="logo" />
                <h2>Delco Farmers Market</h2>
              </div>

              <div className="sidebar-links">
                <p
                  onClick={() => {
                    setShowSidebar(false);
                    setShowModal(true);
                  }}
                >
                  Store Info
                </p>
                <p className="delivery">
                  <span>
                    <LiaTruckMovingSolid className="truck-icon" />
                  </span>
                  <span> Delivery</span>United States
                  <span className="down-icon">
                    <MdKeyboardArrowDown />
                  </span>
                </p>
              </div>

              <hr />

              <div className="sidebar-actions">
                <button className="btn sign-in">Sign Up</button>
                <button className="btn cart">Sign In</button>
              </div>
            </div>
          </div>
        )}
      </header>
      <div className="sub-header">
        <div className="sub-header-container">
          <div className="sub-header-logo-container dropdown">
            <img
              src="/assets/Images/edit-logo.png"
              className="sub-header-logo"
              alt=""
            />
            <MdKeyboardArrowDown size={20} />

            <div className="dropdown-menu">
              <ul>
                <li>About Us</li>
                <li>Contact Support</li>
                <li>In-Store Mode</li>
                <li>Sustainability</li>
                <li>Grocery Subscription</li>
                <li>Prime Savings</li>
              </ul>
            </div>
          </div>

          <span style={{ color: "lightgray", fontSize: "20px" }}>|</span>
          <div className="sub-header-left">
            <div className="dropdown">
              <a href="#">
                Aisles <MdKeyboardArrowDown size={13} />
              </a>
              <div className="dropdown-menu">
                <div className="explore-container">
                  <div className="">
                    <ul>
                      <span>Groceries</span>
                      {departments.map((dept) => (
                        <li key={dept._id}>
                          <img
                            src={`https://api.delcofarmersmarket.com${dept.image_2}`}
                            alt={dept.name}
                            className="department-name-with-images"
                          />
                          {dept.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="">
                    <ul>
                      <span>Trending</span>
                      {departments.map((dept) => (
                        <li key={dept._id}>
                          <img
                            src={`https://api.delcofarmersmarket.com${dept.image_2}`}
                            alt={dept.name}
                            className="department-name-with-images"
                          />
                          {dept.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="dropdown">
              <a href="#">
                Discounts <MdKeyboardArrowDown size={13} />
              </a>
              <div className="dropdown-menu">
                <ul>
                  <li>Featured Savings</li>
                  <li>Markdown</li>
                  <li>All Savings</li>
                </ul>
              </div>
            </div>

            <div className="dropdown">
              <a href="#">
                Explore <MdKeyboardArrowDown size={13} />
              </a>
              <div className="dropdown-menu">
                <div className="explore-container">
                  <div className="">
                    <ul>
                      <span>Discover</span>
                      <li>Emerging Brands</li>
                      <li>Recipes</li>
                      <li>Shop EBT</li>
                      <li>Shop by diet</li>
                      <li>Climate Pledge Friendly</li>
                    </ul>
                  </div>
                  <div>
                    <ul>
                      <span>Trending</span>
                      <li>New to Fresh</li>
                      <li>New Arrivals</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <a href="#">Black Friday</a>
            <span style={{ color: "lightgray", fontSize: "20px" }}>|</span>
            <a href="#">Past Purchases</a>
            <a href="#">Repeat Items</a>
          </div>

          <div className="sub-header-right">
            <div className="sub-header-right-buttons">
              <button
                className={activeModal === "delivery" ? "active" : ""}
                onClick={() => setActiveModal("delivery")}
              >
                <span>
                  <LiaTruckMovingSolid className="truck-icon" />
                </span>
                Delivery
              </button>

              <button
                className={activeModal === "pickup" ? "active" : ""}
                onClick={() => setActiveModal("pickup")}
              >
                <span>
                  <img src="/assets/Icons/pickup.svg" alt="pickup" />
                </span>{" "}
                Pickup
              </button>
            </div>

            <div className="location">
              Delivery to:{" "}
              <span>
                Council Bluffs, United States{" "}
                <span className="down-icon">
                  <MdKeyboardArrowDown />
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="overlay"></div>
      </div>
      {activeModal === "delivery" && (
        <DeliveryModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "pickup" && (
        <LocationModal onClose={() => setActiveModal(null)} />
      )}
    </>
  );
}
