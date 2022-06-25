import axiosInstance from "axios";
import { refreshAccessTokenAPI } from "./user";
import { store } from "../../store";
import { setCookie } from "../utils";

const axios = axiosInstance.create({
  withCredentials: true,
});

axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    if (
      error.response.status === 401 &&
      error.response.data.message === "token expired"
    ) {
      const originalRequest = error.config;
      const userId = store.getState().user.userId;
      const response = await refreshAccessTokenAPI(userId);
      // access_token으로 변경
      const { accessToken } = response.data;

      setCookie("access_token", accessToken, "10");

      originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

      return axios(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default axios;
