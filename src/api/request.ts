import { axiosInstance } from "./config";
import { banner } from "./type";
import {Singer} from "./type"
export const getBannerRequest = () => {
  return axiosInstance.get("/banner") as Promise<{ banners: banner[] }>;
};

export const getRecommendListRequest = () => {
  return axiosInstance.get("/personalized") as Promise<{result:Singer[]}>;
};
