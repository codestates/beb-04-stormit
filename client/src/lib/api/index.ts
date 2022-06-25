import axiosInstance from "axios";
import { refreshAccessTokenAPI } from "./user";
import { parseCookie, setCookie } from "../utils";

const axios = axiosInstance.create({
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${parseCookie(document.cookie).access_token}`,
  },
});

// 액세스 토큰이 만료되었다는 응답을 받으면 액세스 토큰을 새로 재발급받고 다시 요청합니다.
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

      try {
        const response = await refreshAccessTokenAPI();
        // access_token으로 변경
        const { access_token } = response.data;

        setCookie("access_token", access_token, "10");

        originalRequest.headers["Authorization"] = `Bearer ${access_token}`;

        return axios(originalRequest);
      } catch (error) {
        // refreshAPI의 에러
        return Promise.reject(error);
      }
    }
    // originalRequest의 에러
    return Promise.reject(error);
  }
);

export default axios;
