import axios from "axios";

export const baseUrl = "https://netease-cloud-music-api-beta-teal-59.vercel.app/";

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    console.log(err, "网络错误");
  }
);

export { axiosInstance };
