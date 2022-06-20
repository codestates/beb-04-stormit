import { createGlobalStyle, css } from "styled-components";
import reset from "styled-reset";

const globalStyle = css`
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
  }

  li {
    list-style: none;
  }
`;

const GlobalStyle = createGlobalStyle`
    ${globalStyle};
    
`;

export default GlobalStyle;
