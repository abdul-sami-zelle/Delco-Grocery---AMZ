"use client";
import React, { useRef, useState, useEffect, useContext } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import "./MoreProducts.css";
import { getProductData, BASE_URL,getSimilarProducts } from "../../lib/api";
import { CartContext } from "../../context/addToCart";
import { IoAddOutline } from "react-icons/io5";
import { LuMinus } from "react-icons/lu";
import { HiOutlineTrash } from "react-icons/hi";
import { MdAdd } from "react-icons/md";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import ProductDetailModal from "../ProductDetailModal/ProductDetailModal";

const MoreProducts = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
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

  const handleProductClick = async (product) => {
    setSelectedProduct(product);
    setShowModal(true);

    const data = await getSimilarProducts(product.category, product._id, 5);
    setSimilarProducts(data);
  };

  useEffect(() => {
    async function fetchData() {
      const res = await getProductData();
      if (res && Array.isArray(res.data)) {
        setSections(res.data);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) return null;

  return (
    <div className="products-container">
      {loading
        ? [...Array(2)].map((_, secIndex) => (
            <div key={secIndex} className="section-block2">
              <div className="products-header">
                <span
                  className="shimmer shimmer-text"
                  style={{
                    width: "200px",
                    height: "28px",
                    marginLeft: "inherit",
                  }}
                ></span>
                <span
                  className="shimmer shimmer-text"
                  style={{
                    width: "80px",
                    height: "16px",
                    marginRight: "inherit",
                  }}
                ></span>
              </div>
              <span className="horizontal-line"></span>

              <div className="carousel-wrapper">
                <div className="product_card_container">
                  {[...Array(8)].map((_, i) => (
                    <div className="product-card" key={i}>
                      <div className="shimmer shimmer-img"></div>
                      <div
                        className="shimmer shimmer-text"
                        style={{
                          width: "100%",
                          height: "14px",
                          marginTop: "10px",
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        : sections.map((section, index) => (
            <div key={section._id} className="section-block2">
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
                    const [intPart, decPart] = Number(product.price)
                      .toFixed(2)
                      .split(".");
                    const item = getCartItem(product._id);

                    return (
                      <div
                        className="product-card"
                        key={product._id}
                        onClick={() => handleProductClick(product)}
                      >
                        <div className="product-Image">
                          <img
                            src={`${BASE_URL}${product?.image}`}
                            alt={product.title}
                          />

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
                                      addToCart(
                                        {
                                          ...product,
                                          _id: product._id,
                                          image: `${BASE_URL}${product.image}`,
                                        },
                                        product.quantityInitial || 1
                                      );
                                      setShowSideCart(true);
                                      setLoadingProduct(null);
                                    }, 1000);
                                  }}
                                >
                                  <IoAddOutline className="icon-white" />
                                </button>
                              )
                            ) : (
                              <div
                                className="qty-control"
                                id={`qty-${product._id}`}
                              >
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (item.quantity === product.quantityMin) {
                                      const control = document.querySelector(
                                        `#qty-${product._id}`
                                      );
                                      if (control) {
                                        control.classList.add("collapse-anim");
                                        setTimeout(() => {
                                          removeFromCart(product._id);
                                        }, 300);
                                      }
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
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    increaseQuantity(product._id);
                                  }}
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
      {showModal && selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={(newProduct) => {
            newProduct ? handleProductClick(newProduct) : setShowModal(false);
          }}
          allProducts={similarProducts}
        />
      )}
    </div>
  );
};

export default MoreProducts;
