import type { ProductPayload } from "../../Components/AdminLayout/ProductForm/types";
import axiosClient from "./axiosClient";


export type ProductResponse = ProductPayload & {
  id: number;
  createdAt: string;
};

export const adminProductApi = {
  getAll: () =>
    axiosClient.get<Record<string, ProductResponse[]>>("/Product", {
      params: { groupByCategory: true },
    }),

  getById: (id: number) => axiosClient.get<ProductResponse>(`/products/${id}`),

  create: (payload: ProductPayload) =>
    axiosClient.post<ProductResponse>("/Product", payload),

  update: (id: number, payload: Partial<ProductPayload>) =>
    axiosClient.put<ProductResponse>(`/products/${id}`, payload),

  delete: (id: number) => axiosClient.delete<void>(`/products/${id}`),

  uploadImages: (files: File[], adminId = 1) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    return axiosClient.post<{ urls: string[] }>(
      `/Product/upload-images?adminId=${adminId}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
  },
};
