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
          error.response.status === 1000 &&
          error.response.data.message === "token expired"
        ) {
          const originalRequest = error.config;

          const accessToken = await refreshAccessToken();

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
