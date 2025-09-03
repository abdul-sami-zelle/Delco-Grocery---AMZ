"use client";
import React, { useContext, useEffect, useState } from "react";
import "./ProductDetailModal.css";
import { CartContext } from "../../context/addToCart";
import { MdClose, MdAdd } from "react-icons/md";
import { AiOutlineMinus, AiOutlineDelete } from "react-icons/ai";
import { IoAddOutline } from "react-icons/io5";
import { BASE_URL } from "../../lib/api";

const ProductDetailModal = ({ product, onClose, allProducts }) => {
  const [loadingProduct, setLoadingProduct] = useState(null);
  const [loadingSimilar, setLoadingSimilar] = useState(true);

  useEffect(() => {
    setLoadingSimilar(true);
    const timer = setTimeout(() => {
      setLoadingSimilar(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [product]);

  const {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    setShowSideCart,
  } = useContext(CartContext);

  if (!product) return null;

  const item = cart.find((i) => i._id === product._id);
  const similarProducts = Array.isArray(allProducts)
    ? allProducts.filter((p) => p._id !== product._id)
    : [];

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    setLoadingProduct(product._id);
    setTimeout(() => {
      addToCart(
        { ...product, image: `${BASE_URL}${product.image}` },
        product.quantityInitial || 1
      );
      setShowSideCart(true);
      setLoadingProduct(null);
    }, 500);
  };

  return (
    <div className="modal-overlay" onClick={() => onClose()}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={() => onClose()}>
          <MdClose size={22} />
        </button>

        <div className="modal-body">
          <div className="modal-left">
            <img src={`${BASE_URL}${product.image}`} alt={product.title} />
          </div>

          <div className="modal-right">
            <h2>{product.title}</h2>
            {product.brand && <p className="brand">Brand: {product.brand}</p>}

            {product.description && (
              <p className="desc">{product.description}</p>
            )}
            {product.ingredients && (
              <p className="ingredients">
                <b>Ingredients:</b> {product.ingredients}
              </p>
            )}

            <p className="desc">
              <b>Weight/Volume:</b> {product.volume} {product.volumeUnits}
            </p>
            <p className="desc">
              <b>Mode:</b> {product.mode}
            </p>
            <p className="desc">
              <b>Status:</b> {product.is_instock ? "In Stock" : "Out of Stock"}
            </p>

            <p className="price">
              <span className="currency">{product.currency}</span>
              <span className="price-int">{Math.floor(product.price)}</span>
              <span className="price-dec">
                {String(product.price).split(".")[1] || "00"}
              </span>
              / {product.volume} {product.volumeUnits}
            </p>

            <div className="cart-actions">
              {!item ? (
                <button
                  className="add-btn"
                  onClick={() => {
                    addToCart(
                      { ...product, image: `${BASE_URL}${product.image}` },
                      product.quantityInitial || 1
                    );
                    setShowSideCart(true);
                  }}
                >
                  Add to Cart
                </button>
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
                  <button onClick={() => increaseQuantity(product._id)}>
                    <MdAdd />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="similar-products">
          <h3>Similar Products</h3>
          <div className="product_card_container gap-reduce">
            {loadingSimilar
              ? Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <div className="product-card shimmer-card" key={index}>
                      <div className="product-Image shimmer"></div>
                      <p className="product-price shimmer-text"></p>
                      <p className="product-name shimmer-text"></p>
                    </div>
                  ))
              : similarProducts.map((sp) => {
                  const spItem = cart.find((i) => i._id === sp._id);
                  return (
                    <div
                      key={sp._id}
                      className="product-card"
                      onClick={() => onClose(sp)}
                    >
                      <div className="product-Image">
                        <img src={`${BASE_URL}${sp.image}`} alt={sp.title} />

                        <div className="add-btn-container">
                          {!spItem ? (
                            loadingProduct === sp._id ? (
                              <div className="loader"></div>
                            ) : (
                              <button
                                className="plus-btn"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setLoadingProduct(sp._id);
                                  setTimeout(() => {
                                    addToCart(
                                      {
                                        ...sp,
                                        image: `${BASE_URL}${
                                          sp.image || sp.thumbImage
                                        }`,
                                      },
                                      sp.quantityInitial || 1
                                    );
                                    setShowSideCart(true);
                                    setLoadingProduct(null);
                                  }, 500);
                                }}
                              >
                                <IoAddOutline className="icon-white"/>
                              </button>
                            )
                          ) : (
                            <div className="qty-control" id={`qty-${sp._id}`}>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (spItem.quantity === sp.quantityMin) {
                                    removeFromCart(sp._id);
                                  } else {
                                    decreaseQuantity(sp._id);
                                  }
                                }}
                              >
                                {spItem.quantity === sp.quantityMin ? (
                                  <AiOutlineDelete />
                                ) : (
                                  <AiOutlineMinus />
                                )}
                              </button>
                              <span>{spItem.quantity}</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  increaseQuantity(sp._id);
                                }}
                              >
                                <MdAdd />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <p className="product-price">
                        <span className="currency">{sp.currency}</span>
                        <span className="price-int">
                          {Math.floor(sp.price)}
                        </span>
                        <span className="price-dec">
                          {String(sp.price).split(".")[1] || "00"}
                        </span>
                      </p>
                      <p className="product-name">{sp.title}</p>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
