"use client";
import React, { useRef, useState, useEffect, useContext } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import "./SaleProducts.css";
import {
  getSalesProductData,
  BASE_URL,
  getSimilarProducts,
} from "../../lib/api";
import { CartContext } from "../../context/addToCart";
import ProductDetailModal from "../ProductDetailModal/ProductDetailModal";

const SaleProducts = () => {
  const [container, setContainer] = useState(null);
  const [sections, setSections] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [loadingItems, setLoadingItems] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

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
      const res = await getSalesProductData();
      if (res) {
        setContainer(res);
        setSections(res.data);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollRefs = useRef({});

  const scroll = (id, direction) => {
    const scrollRef = scrollRefs.current[id];
    if (scrollRef) {
      const { scrollLeft, clientWidth } = scrollRef;
      const scrollAmount = clientWidth - 100;
      scrollRef.scrollTo({
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
    <div
      className="sales-products-container"
      style={{
        backgroundColor: container?.bgColor
          ? container.bgColor.startsWith("#")
            ? container.bgColor
            : `#${container.bgColor}`
          : "transparent",
      }}
    >
      {sections.map((section, index) => {
        const sectionImage = section?.image
          ? `${BASE_URL}${section.image}`
          : null;
        const products = section?.products
          ? section.products.map((p) => ({
              ...p,
              image: p.image,
            }))
          : [];

        return (
          <div key={section._id} className="sales-section">
            {index === 0 && (
              <div className="sales-top-banner">
                <img src="/assets/Images/savings.png" alt="Savings" />
              </div>
            )}

            <div
              className={`sales-container-wrapper ${
                sectionImage ? "with-image" : "full-width"
              }`}
            >
              {sectionImage && (
                <div className="sales-left-img">
                  <img
                    src={sectionImage}
                    alt={section?.sec_name || "section banner"}
                  />
                </div>
              )}

              <div className="sales-container">
                <div className="sales-header">
                  <span>{section?.sec_name}</span>
                  <p>
                    See more <FaChevronRight color="#2162a1" size={12} />
                  </p>
                </div>

                <span className="horizontal-line"></span>

                <div className="sales-department-image-craousel">
                  <div className="sales-carousel-wrapper">
                    <button
                      className="sales-arrow-btn left"
                      onClick={() => scroll(section._id, "left")}
                    >
                      <FaChevronLeft />
                    </button>
                    <div
                      className="sales_card_container"
                      ref={(el) => (scrollRefs.current[section._id] = el)}
                    >
                      {products.map((item) => {
                        const [intPart, decPart] = Number(item.price)
                          .toFixed(2)
                          .split(".");

                        const cartItem = getCartItem(item._id);

                        return (
                          <div
                            className="sales-card"
                            key={item._id}
                            onClick={() => handleProductClick(item)}
                          >
                            <div className="sales-Image">
                              <img
                                src={`${BASE_URL}${item?.image}`}
                                alt={item.title}
                              />
                              <div className="add-btn-container">
                                {!cartItem ? (
                                  loadingItems[item._id] ? (
                                    <div className="loader"></div>
                                  ) : (
                                    <button
                                      className="plus-btn"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setLoadingItems((prev) => ({
                                          ...prev,
                                          [item._id]: true,
                                        }));

                                        setTimeout(() => {
                                          addToCart(
                                            {
                                              ...item,
                                              _id: item._id,
                                              image: `${BASE_URL}${item?.image}`,
                                            },
                                            item.quantityInitial || 1
                                          );
                                          setShowSideCart(true);
                                          setLoadingItems((prev) => {
                                            const copy = { ...prev };
                                            delete copy[item._id];
                                            return copy;
                                          });
                                        }, 800);
                                      }}
                                    >
                                      <IoAddOutline className="icon-white" />
                                    </button>
                                  )
                                ) : (
                                  <div
                                    className="qty-control"
                                    id={`qty-${item._id}`}
                                  >
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (
                                          cartItem.quantity === item.quantityMin
                                        ) {
                                          const control =
                                            document.querySelector(
                                              `#qty-${item._id}`
                                            );
                                          if (control) {
                                            control.classList.add(
                                              "collapse-anim"
                                            );
                                            setTimeout(() => {
                                              removeFromCart(item._id);
                                            }, 300);
                                          }
                                        } else {
                                          decreaseQuantity(item._id);
                                        }
                                      }}
                                    >
                                      {cartItem.quantity ===
                                      item.quantityMin ? (
                                        <AiOutlineDelete />
                                      ) : (
                                        <AiOutlineMinus />
                                      )}
                                    </button>
                                    <span>{cartItem.quantity}</span>

                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        increaseQuantity(item._id);
                                      }}
                                    >
                                      <MdAdd />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                            <p className="product-price">
                              <span className="currency">{item.currency}</span>
                              <span className="price-int">{intPart}</span>
                              <span className="price-dec">{decPart}</span>
                            </p>

                            <p className="product-name">{item.title}</p>
                          </div>
                        );
                      })}
                    </div>

                    <button
                      className="sales-arrow-btn right"
                      onClick={() => scroll(section._id, "right")}
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

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

export default SaleProducts;
