"use client";
import React, { useEffect, useState, useRef, useContext } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import { AiOutlineMinus, AiOutlineDelete } from "react-icons/ai";
import { CartContext } from "../../context/addToCart";
import "./ProductSection.css";

const ProductSection = ({ fetchApi, sectionClass = "section-block" }) => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingProduct, setLoadingProduct] = useState(null);
  const scrollRefs = useRef({});

  const {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    setShowSideCart,
  } = useContext(CartContext);

  const getCartItem = (id) => cart.find((item) => item._id === id);

  useEffect(() => {
    async function fetchData() {
      const res = await fetchApi();
      if (res && res.data) {
        setSections(res.data);
      }
      setLoading(false);
    }
    fetchData();
  }, [fetchApi]);

  const scroll = (sectionIndex, direction) => {
    const ref = scrollRefs.current[sectionIndex];
    if (ref) {
      const { scrollLeft, clientWidth } = ref;
      const scrollAmount = clientWidth - 100;
      ref.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="products-container">
      {loading
        ? [...Array(2)].map((_, secIndex) => (
            <div key={secIndex} className={sectionClass}>
              {/* shimmer ya loader */}
            </div>
          ))
        : sections.map((section, index) => (
            <div key={section._id} className={sectionClass}>
              <div className="products-header">
                <span>{section.sec_name}</span>
                <p>
                  See more <FaChevronRight color="#2162a1" size={12} />
                </p>
              </div>
              <span className="horizontal-line"></span>

              <div className="carousel-wrapper">
                <button
                  className="arrow-btn left"
                  onClick={() => scroll(index, "left")}
                >
                  <FaChevronLeft />
                </button>

                <div
                  className="product_card_container"
                  ref={(el) => (scrollRefs.current[index] = el)}
                >
                  {section.products.map((product) => {
                    const item = getCartItem(product._id);
                    const [intPart, decPart] = Number(product.price)
                      .toFixed(2)
                      .split(".");

                    return (
                      <div className="product-card" key={product._id}>
                        <div className="product-Image">
                          <img src={product.image} alt={product.title} />

                          <div className="add-btn-container">
                            {!item ? (
                              loadingProduct === product._id ? (
                                <div className="loader"></div>
                              ) : (
                                <button
                                  className="plus-btn"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setLoadingProduct(product._id);
                                    setTimeout(() => {
                                      addToCart(product, 1);
                                      setShowSideCart(true);
                                      setLoadingProduct(null);
                                    }, 800);
                                  }}
                                >
                                  <IoAddOutline />
                                </button>
                              )
                            ) : (
                              <div className="qty-control">
                                <button
                                  onClick={() => {
                                    if (item.quantity === product.quantityMin) {
                                      removeFromCart(product._id);
                                    } else {
                                      decreaseQuantity(product._id);
                                    }
                                  }}
                                >
                                  {item.quantity === product.quantityMin ? (
                                    <AiOutlineDelete />
                                  ) : (
                                    <AiOutlineMinus />
                                  )}
                                </button>

                                <span>{item.quantity}</span>

                                <button
                                  onClick={() => increaseQuantity(product._id)}
                                >
                                  <MdAdd />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        <p className="product-price">
                          <span className="currency">{product.currency}</span>
                          <span className="price-int">{intPart}</span>
                          <span className="price-dec">{decPart}</span>
                        </p>

                        <p className="product-name">{product.title}</p>
                      </div>
                    );
                  })}
                </div>

                <button
                  className="arrow-btn right"
                  onClick={() => scroll(index, "right")}
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          ))}
          
    </div>
  );
};

export default ProductSection;
