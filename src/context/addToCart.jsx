"use client";

import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [showSideCart, setShowSideCart] = useState(false);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (showSideCart) {
      document.body.classList.add("cart-open");
    } else {
      document.body.classList.remove("cart-open");
    }
  }, [showSideCart]);

  const addToCart = (product, quantity) => {
    const qty = Number(quantity) || product.quantityInitial || 1;

    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item._id === product._id
      );

      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += qty;

        if (updatedCart[existingProductIndex].quantity > product.quantityMax) {
          updatedCart[existingProductIndex].quantity = product.quantityMax;
        }
        return updatedCart;
      }

      return [...prevCart, { ...product, quantity: qty }];
    });
    setShowSideCart(true);
  };

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity:
                item.quantity + item.quantityStep > item.quantityMax
                  ? item.quantityMax
                  : item.quantity + item.quantityStep,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity:
                item.quantity - item.quantityStep < item.quantityMin
                  ? item.quantityMin
                  : item.quantity - item.quantityStep,
            }
          : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        showSideCart,
        setShowSideCart,
        order,
        setOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
