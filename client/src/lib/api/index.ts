import axiosInstance from "axios";
import { parseCookie } from "../utils";
import useRefreshToken from "../../hooks/useRefreshToken";

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

      const refreshAccessToken = useRefreshToken();

      const accessToken = await refreshAccessToken();

      originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

      return axios(originalRequest);
    }
    // originalRequest의 에러
    return Promise.reject(error);
  }
);

export default axios;
