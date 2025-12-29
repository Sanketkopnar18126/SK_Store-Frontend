import type {
  AuthResponseDto,
  LoginPayload,
  RegisterPayload,
} from "../../Components/AdminLayout/ProductForm/types";
import axiosClient from "../Admin_API/axiosClient";

export const authApi = {
  login: (payload: LoginPayload) =>
    axiosClient.post<AuthResponseDto>("/Auth/login", payload),

  register: (payload: RegisterPayload) =>
    axiosClient.post<AuthResponseDto>("/Auth/register", payload),

  refresh: (refreshToken: string) =>
    axiosClient.post<AuthResponseDto>("/Auth/refresh", refreshToken),

  logout: (refreshToken: string) =>
    axiosClient.post<void>("/Auth/logout", refreshToken),
};
