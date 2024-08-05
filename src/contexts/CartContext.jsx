"use client";

import { createContext, useMemo, useReducer, useEffect } from "react";

// Define initial state without accessing localStorage
const INITIAL_STATE = {
  cart: [],
};

export const CartContext = createContext({});

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_CART_AMOUNT":
      const cartList = state.cart ?? [];
      const cartItem = action.payload;
      const exist = cartList.find((item) => item.id === cartItem.id);

      if (!cartItem.quantity || cartItem.quantity < 1) {
        // Ürün sepetten çıkarılacak
        const filteredCart = cartList.filter((item) => item.id !== cartItem.id);
        localStorage.setItem("cart", JSON.stringify(filteredCart));
        return { ...state, cart: filteredCart };
      }

      // Ürün sepette zaten varsa
      if (exist) {
        const newCart = cartList.map((item) =>
          item.id === cartItem.id
            ? { ...item, quantity: cartItem.quantity }
            : item
        );
        localStorage.setItem("cart", JSON.stringify(newCart));
        return { ...state, cart: newCart };
      }

      // Yeni ürün sepete ekleniyor
      const updatedCart = [...cartList, cartItem];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { ...state, cart: updatedCart };

    case "SET_INITIAL_CART":
      return { ...state, cart: action.payload };

    default:
      return state;
  }
};

export default function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  // Component ilk yüklendiğinde local storage'daki cart verisini kontrol et
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      dispatch({ type: "SET_INITIAL_CART", payload: storedCart });
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}
