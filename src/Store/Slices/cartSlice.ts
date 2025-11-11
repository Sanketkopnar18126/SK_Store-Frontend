// src/Store/slices/cartSlice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { cartApi } from "../../API/Cart_API/cartApi";
import type { CartItemPayload, CartResponse } from "../../Components/AdminLayout/ProductForm/types";

export interface CartState {
  loading: boolean;
  error?: string | null;
  cart:CartResponse| null;
  open: boolean;
  lastUpdated?: string;
  fetched:boolean;
}

const initialState: CartState = {
  loading: false,
  error: null,
  cart:  null,
  open: false,
  lastUpdated: undefined,
  fetched:false
};

// Thunks that call server and expect server returns full cart
export const fetchCart = createAsyncThunk<CartResponse>(
  "cart/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await cartApi.getCart();
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message ?? err.message ?? "Failed to fetch cart");
    }
  }
);

export const addCartItem = createAsyncThunk<CartResponse, CartItemPayload>(
  "cart/addItem",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await cartApi.addItem(payload);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message ?? err.message ?? "Failed to add item");
    }
  }
);

export const updateCartItem = createAsyncThunk<CartResponse, { productId: number; qty: number }>(
  "cart/updateItem",
  async ({ productId, qty }, { rejectWithValue }) => {
    try {
      const res = await cartApi.updateItem(productId, qty);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message ?? err.message ?? "Failed to update item");
    }
  }
);

export const removeCartItem = createAsyncThunk<CartResponse, number>(
  "cart/removeItem",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await cartApi.removeItem(productId);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message ?? err.message ?? "Failed to remove item");
    }
  }
);

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    openCart(state) {
      state.open = true;
    },
    closeCart(state) {
      state.open = false;
    },
    toggleCart(state) {
      state.open = !state.open;
    },
    clearLocalCart(state) {
      state.cart = null;
    },

    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cart?.items.find(i => i.productId === action.payload);
      if (item) {
        item.quantity = (item.quantity ?? 1) + 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cart?.items.find(i => i.productId === action.payload);
      if (item && item.quantity && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
     removeItem: (state, action: PayloadAction<number>) => {
      if (state.cart?.items) {
        state.cart.items = state.cart.items.filter(
          i => i.productId !== action.payload
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchCart
      .addCase(fetchCart.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchCart.fulfilled, (s, a: PayloadAction<CartResponse>) => {
        s.loading = false; 
        s.cart = a.payload; 
        s.error = null; 
        s.lastUpdated = new Date().toISOString();
        s.fetched=true
      })
      .addCase(fetchCart.rejected, (s, a) => { s.loading = false; s.error = a.payload as string; })

      // addCartItem
      .addCase(addCartItem.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(addCartItem.fulfilled, (s, a: PayloadAction<CartResponse>) => {
        s.loading = false; 
        s.cart = a.payload; 
        s.error = null;
        s.lastUpdated = new Date().toISOString();
      })
      .addCase(addCartItem.rejected, (s, a) => { s.loading = false; s.error = a.payload as string; })

      // updateCartItem
      .addCase(updateCartItem.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(updateCartItem.fulfilled, (s, a: PayloadAction<CartResponse>) => {
        s.loading = false;
        s.cart = a.payload;
        s.error = null;
        s.lastUpdated = new Date().toISOString();
      })
      .addCase(updateCartItem.rejected, (s, a) => { s.loading = false; s.error = a.payload as string; })

      // removeCartItem
      .addCase(removeCartItem.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(removeCartItem.fulfilled, (s, a: PayloadAction<CartResponse>) => {
        s.loading = false; s.cart = a.payload;
        s.error = null; 
        s.lastUpdated = new Date().toISOString();
      })
      .addCase(removeCartItem.rejected, (s, a) => { s.loading = false; s.error = a.payload as string; });
  },
});

export const { openCart, closeCart, toggleCart, clearLocalCart,increaseQuantity, decreaseQuantity, removeItem } = slice.actions;
export default slice.reducer;
