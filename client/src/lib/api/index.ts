import axiosInstance from "axios";

const axios = axiosInstance.create({
  withCredentials: true,
});

export default axios;
