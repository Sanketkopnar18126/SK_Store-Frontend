import axios from "axios";
import type {
  LoginPayload,
  RegisterPayload,
} from "../../Components/AdminLayout/ProductForm/types";

const BASE_URL = "https://localhost:7126/api";

export const authApi = {
  login: (data: LoginPayload) =>
    axios.post(`${BASE_URL}/Auth/login`, data, {
      withCredentials: true,
    }),

  register: (data: RegisterPayload) =>
    axios.post(`${BASE_URL}/Auth/register`, data, {
      withCredentials: true,
    }),

  refresh: () =>
    axios.post(
      `${BASE_URL}/Auth/refresh`,
      {},
      {
        withCredentials: true,
      }
    ),

  logout: () =>
    axios.post(
      `${BASE_URL}/Auth/logout`,
      {},
      {
        withCredentials: true,
      }
    ),
};
