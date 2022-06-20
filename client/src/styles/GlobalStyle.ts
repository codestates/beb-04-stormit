import { createGlobalStyle, css } from "styled-components";
import reset from "styled-reset";

interface GlobalStyleProps {
  menuModalOpen: boolean;
  profileModalOpen: boolean;
}

const globalStyle = css<GlobalStyleProps>`
  ${reset}
  * {
    box-sizing: border-box;
    font-family: "Roboto", "Noto Sans KR", sans-serif;
  }

  *,
  body {
    font-family: "Roboto", "Noto Sans KR", sans-serif;
  }

  a {
    text-decoration: none;

    &:visited {
      color: inherit;
    }
  }

  li {
    list-style: none;
  }

  // 모달이 열려있고 모바일 뷰일 때 스크롤 봉인
  @media screen and (max-width: 77.5rem) {
    ${({ menuModalOpen, profileModalOpen }) =>
      (menuModalOpen || profileModalOpen) &&
      css`
        html,
        body {
          overflow: hidden;
        }
      `}
  }
`;

const GlobalStyle = createGlobalStyle`
    ${globalStyle};
    
`;

export default GlobalStyle;
