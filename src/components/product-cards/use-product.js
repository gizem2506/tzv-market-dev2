"use client";

import { useCallback, useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import useCart from "../../hooks/useCart";

export default function useProduct(slug) {
  const { state, dispatch } = useCart();
  const { enqueueSnackbar } = useSnackbar();
  const [openModal, setOpenModal] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
  }, [state.cart]);

  const cartItem = state.cart.find((item) => item.product_slug === slug);

  const toggleFavorite = useCallback(() => setIsFavorite((fav) => !fav), []);
  const toggleDialog = useCallback(() => setOpenModal((open) => !open), []);

  const handleCartAmountChange = useCallback((product, type) => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: product,
    });
    // SHOW ALERT PRODUCT ADDED OR REMOVED
    if (type === "remove") {
      enqueueSnackbar("Removed from Cart", {
        variant: "error",
      });
    } else {
      enqueueSnackbar("Added to Cart", {
        variant: "success",
      });
    }
  }, [dispatch, enqueueSnackbar]);

  return {
    cartItem,
    openModal,
    isFavorite,
    toggleDialog,
    toggleFavorite,
    handleCartAmountChange,
  };
}
