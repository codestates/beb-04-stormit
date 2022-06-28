import { useEffect } from "react";
import axios from "../lib/api";
import useRefreshAccessToken from "./useRefreshToken";

const useAxiosIntercept = () => {
  const refreshAccessToken = useRefreshAccessToken();

  useEffect(() => {
    const responseIntercept = axios.interceptors.response.use(
      async (response) => response,
      async (error) => {
        if (
          error.response.status === 401 &&
          error.response.data.message === "token expired"
        ) {
          const originalRequest = error.config;

          const accessToken = await refreshAccessToken();

          if (!accessToken) return Promise.reject(error);

          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return axios(originalRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(responseIntercept);
    };
  }, [refreshAccessToken]);

  return axios;
};

export default useAxiosIntercept;
