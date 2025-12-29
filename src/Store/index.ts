import { configureStore } from "@reduxjs/toolkit";
import productReducer from './Slices/ProductSlice'
import cartReducer from "./Slices/cartSlice";
import authReducer from './Slices/AuthSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
      cart: cartReducer,
      auth:authReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
