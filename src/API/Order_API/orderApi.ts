import type {
  CheckoutOrderDto,
  CheckoutResponseDto,
  VerifyPaymentDto,
} from "../../Components/AdminLayout/ProductForm/types";
import axiosClient from "../Admin_API/axiosClient";

export const orderApi = {
  checkout: (payload: CheckoutOrderDto, token?: string) => {
    return axiosClient.post<CheckoutResponseDto>(
      "/Order/checkout",
      payload,

      {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      }
    );
  },

  verify: (payload: VerifyPaymentDto, token?: string) => {
    return axiosClient.post(
      "/Order/verify",
      payload,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      }
    );
  },
};
