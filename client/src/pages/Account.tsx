import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import NavigationRail from "../components/NavigationRail";
import { updatePasswordAPI, withdrawalAPI } from "../lib/api/user";
import { useDispatch, useSelector } from "../store";
import { userActions } from "../store/userSlice";
import palette from "../styles/palette";
import ErrorIcon from "@mui/icons-material/Error";
import useAuthenticate from "../hooks/useAuthenticate";

const Base = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem; // 16px

  .contents {
    display: flex;
    flex-direction: column;
    gap: 1rem; // 16px
  }

  .account-dialog-title {
    font-size: 1.5rem;
    font-weight: 500;

    margin: 1rem 0; // 16px 0
  }

  .account-button-wrapper {
    display: flex;
    justify-content: center;
    margin: 1rem 0; // 16px 0
  }

  .account-email-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem; // 8px
    margin-bottom: 1rem;
  }

  .private-key-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem; // 8px
    margin: 1rem 0; // 16px 0
  }

  .private-key {
    font-size: 0.875rem; // 14px
    color: ${palette.gray[400]};
  }

  .withdrawal {
    text-align: right;
    color: ${palette.gray[300]};
    text-decoration: underline;
    cursor: pointer;
  }

  .password-error-message {
    font-size: 0.875rem;
    color: ${palette.red[500]};
  }

  .password-input-wrapper {
    display: flex;
    align-items: center;
    gap: 1rem; // 16px
  }

  .password-error-icon {
    color: ${palette.red[500]};
  }

  // 600px
  @media screen and (min-width: 37.5rem) {
    margin: 1rem auto;
    max-width: 37.5rem; // 600px
  }
`;

const Account: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [newPasswordValid, setNewPasswordValid] = useState(true);

  const email = useSelector((state) => state.user.email);
  const userId = useSelector((state) => state.user.userId);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const navigate = useNavigate();

  const authenticate = useAuthenticate();

  const dispatch = useDispatch();

  const validateNewPassword = (password: string) => {
    const regExp = /^(?=.*[a-z])(?=.*[$@!%*#?&])[a-z0-9$@!%*#?&]{8,20}$/;
    setNewPasswordValid(regExp.test(password));
  };

  const onChangeCurrentPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCurrentPassword(event.target.value);
  };

  const onChangeNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    validateNewPassword(event.target.value);
    setNewPassword(event.target.value);
  };

  const onClickSubmit = async () => {
    const body = {
      user_id: userId,
      current_password: currentPassword,
      new_password: newPassword,
    };

    try {
      await updatePasswordAPI(body);

      setCurrentPassword("");
      setNewPassword("");
      alert("?????????????????????.");
    } catch (error) {
      console.log(error);
      setPasswordError(true);
    }
  };

  const onClickWithdrawalButton = async () => {
    if (
      window.confirm("??? ??? ???????????? ????????? ??? ????????????. ?????????????????????????")
    ) {
      try {
        const response = await withdrawalAPI();
        console.log(response);
        dispatch(userActions.setLoggedOut());
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const protectPage = async () => {
      try {
        await authenticate();
        !isLoggedIn && navigate("/login", { replace: true });
      } catch (error) {
        console.log(error);
      }
    };

    protectPage();
  }, [authenticate, navigate, isLoggedIn]);

  return (
    <Base>
      <NavigationRail />
      <div className="contents">
        <p className="account-dialog-title">?????? ??? ?????????</p>
        <p className="account-email-wrapper">
          <span>?????????:</span>
          <span className="account-email">
            {email || "nononcrust@gmail.com"}
          </span>
        </p>
        <label className="password-label">?????? ????????????</label>
        <div className="password-input-wrapper">
          <Input
            type="password"
            placeholder="?????? ??????????????? ??????????????????"
            value={currentPassword}
            onChange={onChangeCurrentPassword}
            validated={!passwordError}
            width="100%"
          />
          {passwordError && <ErrorIcon className="password-error-icon" />}
        </div>
        {passwordError && (
          <p className="password-error-message">??????????????? ?????????????????????.</p>
        )}
        <label className="password-label">????????? ????????????</label>
        <Input
          type="password"
          placeholder="????????? ??????????????? ??????????????????"
          value={newPassword}
          onChange={onChangeNewPassword}
          validated={newPasswordValid}
        />
        {!newPasswordValid && (
          <p className="password-error-message">
            ??????????????? 8~20??? ????????????, ?????? ????????? ??????????????? ???????????? ?????????.
          </p>
        )}
        <div className="account-button-wrapper">
          <Button variant="contained" onClick={onClickSubmit}>
            ????????????
          </Button>
        </div>
        <p className="withdrawal" onClick={onClickWithdrawalButton}>
          ????????????
        </p>
      </div>
    </Base>
  );
};

export default Account;
