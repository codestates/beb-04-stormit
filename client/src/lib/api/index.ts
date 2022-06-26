import axiosInstance from "axios";
import { parseCookie } from "../utils";

const axios = axiosInstance.create({
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${parseCookie(document.cookie).access_token}`,
  },
});

export default axios;
