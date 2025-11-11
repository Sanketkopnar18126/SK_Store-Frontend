import type { CartItemPayload, CartResponse } from "../../Components/AdminLayout/ProductForm/types";
import axiosClient from "../Admin_API/axiosClient";

export const cartApi = {
  getCart: () => axiosClient.get<CartResponse>("/Cart"),

  addItem: (payload: CartItemPayload) =>
    axiosClient.post<CartResponse>("/Cart/items", payload),

  updateItem: (productId: number, qty: number) =>
    axiosClient.put<CartResponse>(`/Cart/Items/${productId}`, { qty }),

  removeItem: (productId: number) =>
    axiosClient.delete<CartResponse>(`/Cart/Items/${productId}`),
};
