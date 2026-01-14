import { configureStore } from "@reduxjs/toolkit";
import productReducer from './Slices/ProductSlice'
import cartReducer from "./Slices/cartSlice";
import authReducer from './Slices/AuthSlice';
import bannerReducer from './Slices/BannerSlice';
import paymentReducer from './Slices/PaymentSlice';
import orderReducer from './Slices/OrderSlice';
import { setStore } from "./storeAccessor";


export const store = configureStore({
  reducer: {
    products: productReducer,
      cart: cartReducer,
      auth:authReducer,
      banner:bannerReducer,
      payment:paymentReducer,
       order: orderReducer,
      
  },
});
setStore(store)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
