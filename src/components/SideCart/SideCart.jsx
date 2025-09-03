"use client";
import React, { useContext, useEffect } from "react";
import "./SideCart.css";
import { IoIosClose, IoIosAdd } from "react-icons/io";
import { HiMinusSmall } from "react-icons/hi2";
import { TbTrash } from "react-icons/tb";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CartContext } from "../../context/addToCart";

const SideCart = () => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    showSideCart,
    setShowSideCart,
  } = useContext(CartContext);

  const router = useRouter();

  const handleCloseSideCart = () => setShowSideCart(false);
  const handleCheckout = () => {
    router.push("/checkout");
  };

  const getNumericPrice = (price) =>
    parseFloat(String(price).replace(/[^0-9.]/g, "")) || 0;

  const total = cart.reduce(
    (acc, item) => acc + getNumericPrice(item.price) * item.quantity,
    0
  );

  useEffect(() => {
    const mainLayout = document.querySelector(".main-layout");
    if (!mainLayout) return;
    if (showSideCart) {
      mainLayout.classList.add("shrink-layout");
    } else {
      mainLayout.classList.remove("shrink-layout");
    }
    return () => {
      mainLayout.classList.remove("shrink-layout");
    };
  }, [showSideCart]);

  useEffect(() => {
    if (cart.length === 0 && showSideCart) {
      setShowSideCart(false);
    }
  }, [cart, showSideCart, setShowSideCart]);

  return (
    <>
      <div
        className={`cart-overlay ${showSideCart ? "show" : ""}`}
        onClick={handleCloseSideCart}
      />

      <aside
        className={`side-cart-contaner ${showSideCart ? "show-side-cart" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`side-cart-inner-container ${
            showSideCart ? "show-side-cart-inner" : ""
          }`}
        >
          <div className="side-cart-head">
            <span>
              <div className="cart-image-wrapper">
                <img src="/assets/Icons/cart-icon.svg" alt="cart" />
                <span className="cart-count">{cart.length}</span>
              </div>
              Your Cart
            </span>
          </div>

          <div className="side-cart-products-container">
            {cart.length === 0 ? (
              <div className="empty-cart-container">
                <Image
                  src="/assets/Images/cart-empty.png"
                  width={150}
                  height={150}
                  alt="Empty Cart"
                />
                <h3>No Product Found</h3>
                <p>Your Cart Is Empty!</p>
              </div>
            ) : (
              [...cart].reverse().map((item) => {
                const unitPrice = getNumericPrice(item.price);
                const totalItemPrice = (unitPrice * item.quantity).toFixed(2);

                return (
                  <div className="side-cart-single-product" key={item._id}>
                    <button
                      className="side-cart-single-product-delete"
                      onClick={() => removeFromCart(item._id)}
                    >
                      <TbTrash size={20} color="#E54B4B" />
                    </button>

                    <div className="side-cart-image-container">
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: "150px", height: "100px" }}
                      />
                    </div>

                    <div className="side-cart-product-details">
                      <h3>{item.title}</h3>
                      <p className="unit-price">
                        {item.currency}
                        {unitPrice.toFixed(2)}
                      </p>

                      <div className="quantity-price-row">
                        <div className="select-product-quantity-add">
                          <button onClick={() => decreaseQuantity(item._id)}>
                            <HiMinusSmall size={20} color="#6a733a" />
                          </button>

                          <input type="text" value={item.quantity} readOnly />

                          <button onClick={() => increaseQuantity(item._id)}>
                            <IoIosAdd size={20} color="#6a733a" />
                          </button>
                        </div>
                        <p className="total-price">
                          {item.currency}
                          {totalItemPrice}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {cart.length > 0 && (
          <div className="side-cart-checkout-contianer">
            <div className="subtotal-row">
              <span>Subtotal:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button onClick={handleCheckout}>Checkout</button>
          </div>
        )}
      </aside>
    </>
  );
};

export default SideCart;
