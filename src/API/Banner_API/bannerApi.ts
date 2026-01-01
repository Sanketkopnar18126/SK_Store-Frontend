import axiosClient from "../Admin_API/axiosClient";

export interface BannerResponse {
  id: number;
  imageUrl: string;
}
export const bannerApi = {
  getBanners: () => axiosClient.get<BannerResponse[]>("/Banners"),
};
