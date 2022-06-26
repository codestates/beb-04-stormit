import { authenticateAPI } from "../lib/api/user";
import { parseCookie } from "../lib/utils";
import { useDispatch } from "../store";
import { userActions } from "../store/userSlice";

const useAuthenticate = () => {
  const dispatch = useDispatch();

  const authenticate = async () => {
    const accessToken = parseCookie(document.cookie).access_token;

    try {
      const response = await authenticateAPI(accessToken);
      const { user_id: userId, username: email, nickname } = response.data;

      dispatch(userActions.setLoggedIn());

      dispatch(
        userActions.setUserInfo({
          email: email,
          nickname: nickname,
          userId: userId,
        })
      );

      console.log("logged in");
    } catch (error) {
      dispatch(userActions.setLoggedOut());
    }
  };

  return authenticate;
};

export default useAuthenticate;
