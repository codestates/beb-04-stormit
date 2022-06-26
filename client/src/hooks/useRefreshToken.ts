import { refreshAccessTokenAPI } from "../lib/api/user";
import { setCookie } from "../lib/utils";

const useRefreshAccessToken = () => {
  const refreshAccessToken = async () => {
    try {
      const response = await refreshAccessTokenAPI();

      const { access_token } = response.data;
      setCookie("access_token", access_token, "10");

      return access_token;
    } catch (error) {
      console.log(error);
    }
  };

  return refreshAccessToken;
};

export default useRefreshAccessToken;
