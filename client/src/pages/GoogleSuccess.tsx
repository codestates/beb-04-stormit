import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authenticateAPI, googleLoginAPI } from "../lib/api/user";
import { setCookie } from "../lib/utils";
import { useDispatch } from "../store";
import { snackbarActions } from "../store/snackbarSlice";
import { userActions } from "../store/userSlice";

const GoogleSuccess: React.FC = () => {
  const location = useLocation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const search = location.search;

  const params = new URLSearchParams(search);

  const googleToken = params.get("google_token");

  useEffect(() => {
    const googleLogin = async () => {
      if (!googleToken) return;
      const body = { google_token: googleToken };
      const loginAPIResponse = await googleLoginAPI(body);

      console.log(loginAPIResponse);

      const { access_token } = loginAPIResponse.data;

      setCookie("access_token", access_token, "7200");

      console.log("@@@ google login @@@");
      console.log(access_token);
      const authAPIResponse = await authenticateAPI(access_token);

      const {
        user_id: userId,
        username: email,
        nickname,
      } = authAPIResponse.data;

      if (authAPIResponse.status !== 200) return;

      dispatch(userActions.setLoggedIn());
      dispatch(
        userActions.setUserInfo({
          email: email,
          nickname: nickname,
          userId: userId,
        })
      );

      dispatch(snackbarActions.openLoginSnackbar());
      navigate("/");
    };

    googleLogin();
  }, [googleToken, dispatch, navigate]);

  return <div>Redirecting...</div>;
};

export default GoogleSuccess;
