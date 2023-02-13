/* 전역 스타일 - 애플리케이션 레벨 스타일 */
import { createGlobalStyle } from "styled-components";
import "../static/fonts/font.css"

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family: "NotoSans";
    /* line-height: 1.5; */
  }
`;

export default GlobalStyle;