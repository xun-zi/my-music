import { axiosInstance } from "./config";
import { banner, CurrentAlbum } from "./type";
import {Singer} from "./type"
export const getBannerRequest = () => {
  return axiosInstance.get("/banner") as Promise<{ banners: banner[] }>;
};

export const getRecommendListRequest = () => {
  return axiosInstance.get("/personalized") as Promise<{result:Singer[]}>;
};

export const getAlbumDetailRequest = (id: string | number) => {
  return axiosInstance.get(`/playlist/detail?id=${id}`);
};