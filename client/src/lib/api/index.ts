import axiosInstance from "axios";
import { refreshAccessTokenAPI } from "./user";

const axios = axiosInstance.create({
  withCredentials: true,
});

axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    console.log("@@@ error response @@@");
    console.log(error.response);

    console.log("@@@ error config @@@");
    console.log(error.config);

    if (
      error.response.status === 401 &&
      error.response.statusText === "token expired"
    ) {
      const originalRequest = error.config;
      console.log(originalRequest);
      const response = await refreshAccessTokenAPI();
      const access_token = response.data;

      originalRequest.headers["Authorization"] = `Bearer ${access_token}`;

      return axios(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default axios;
