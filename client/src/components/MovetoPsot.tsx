import Dialog from "./common/Dialog";
import Input from "./common/Input";
import Button from "./common/Button";
import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import palette from "../styles/palette";
import { useNavigate } from "react-router-dom";
import { useSelector } from "../store";

const Base = styled.div`
  padding-bottom: 2rem;
  .Intro {
    display: flex;
    border-radius: 1rem;
    .profileBtn {
      padding: 0;
      margin-right: 1rem;
      :hover {
        background-color: #ffff;
      }
      .move-profile {
        height: 3rem;
        width: 3rem;
        color: ${palette.gray[600]};
        :hover {
          color: ${palette.gray[700]};
        }
      }
    }
  }
  .move-post {
    position: relative;
    left: 0;
    width: 100%;
    color: ${palette.gray[600]};
    background-color: ${palette.gray[100]};
    :hover {
      background-color: ${palette.gray[200]};
    }
  }
`;

const MovetoPost: React.FC = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();
  const onUserProfile = () => {
    if (isLoggedIn) {
      navigate("/mypage");
    } else {
      navigate("/login");
    }
  };
  const onPost = () => {
    if (isLoggedIn) {
      navigate("/post");
    } else {
      navigate("/login");
    }
  };
  return (
    <Base>
      <Dialog className="Intro">
        <Button className="profileBtn" onClick={onUserProfile}>
          <AccountCircleIcon className="move-profile" />
        </Button>
        <Button className="move-post" onClick={onPost}>
          무슨 생각을 하고 계신가요?
        </Button>
      </Dialog>
    </Base>
  );
};

export default MovetoPost;
