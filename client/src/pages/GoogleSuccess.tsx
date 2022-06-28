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

  const googleToken = params.get("jwt");
  console.log(googleToken);

  useEffect(() => {
    const googleLogin = async () => {
      if (!googleToken) return;

      try {
        console.log("googleLoginAPI");
        const response = await googleLoginAPI(googleToken);
        const { access_token } = response.data;

        console.log("access_token");
        console.log(access_token);

        setCookie("access_token", access_token, "7200");

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
      } catch (error) {
        console.log(error);
      }
    };

    googleLogin();
    navigate("/");
  }, [googleToken, dispatch, navigate]);

  return <div>Redirecting...</div>;
};

export default GoogleSuccess;
