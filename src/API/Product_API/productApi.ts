import type { ProductPayload } from "../../Components/AdminLayout/ProductForm/types";
import axiosClient from "../Admin_API/axiosClient";

export type ProductResponse = ProductPayload & {
  id: number;
  createdAt: string;
};

export const productApi = {
  getById: (id: number) => axiosClient.get<ProductResponse>(`/product/${id}`),
  getSimilar: (id: number) => axiosClient.get<ProductResponse[]>(`/product/${id}/similar`),
  getRecommended: () =>axiosClient.get<ProductResponse[]>(`/product/recommended`),
};
