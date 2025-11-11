import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../index";

export const selectCartState = (s: RootState) => s.cart;

export const selectCartItemsArray = createSelector(selectCartState, (cartState) => {
  // cartState.cart might be null initially, so guard it
  if (!cartState.cart) return [];
  return cartState.cart.items ?? [];
});

export const selectCartTotalQty = createSelector(selectCartItemsArray, (items) =>
  items.reduce((sum, it) => sum + it.quantity, 0)
);

export const selectCartSubtotal = createSelector(selectCartItemsArray, (items) =>
  items.reduce((sum, it) => sum + it.quantity * (it.unitPrice ?? 0), 0)
);
