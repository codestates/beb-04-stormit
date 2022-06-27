import { createGlobalStyle, css } from "styled-components";

interface GlobalStyleProps {
  menuModalOpen: boolean;
  profileModalOpen: boolean;
}

const globalStyle = css<GlobalStyleProps>`
  * {
    box-sizing: border-box;
    font-family: "Roboto", "Noto Sans KR", sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  *,
  body {
    font-family: "Roboto", "Noto Sans KR", sans-serif;
  }

  a {
    text-decoration: none;
    color: inherit;

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
