import { createGlobalStyle } from 'styled-components'
import { COLORS } from './index'

export const GlobalStyles = createGlobalStyle`

// mustang
@font-face {
  font-family: "Mustang";
  src: url("/fonts/Mustang/Mustang.ttf");
}
// chaney
@font-face {
  font-family: "Chaney";
  src: url("/fonts/Chaney/CHANEY-Regular.otf");
  font-weight: thin;
}
@font-face {
  font-family: "Chaney";
  src: url("/fonts/Chaney/CHANEY-Wide.otf");
  font-weight: bold;
}
// gilroy
@font-face {
  font-family: "Gilroy";
  src: url("/fonts/Gilroy/Gilroy-Thin.ttf");
  font-weight: 100;
}
@font-face {
  font-family: "Gilroy";
  src: url("/fonts/Gilroy/Gilroy-UltraLight.ttf");
  font-weight: 200;
}
@font-face {
  font-family: "Gilroy";
  src: url("/fonts/Gilroy/Gilroy-Light.ttf");
  font-weight: 300;
}
@font-face {
  font-family: "Gilroy";
  src: url("/fonts/Gilroy/Gilroy-Regular.ttf");
  font-weight: 400;
}
@font-face {
  font-family: "Gilroy";
  src: url("/fonts/Gilroy/Gilroy-Medium.ttf");
  font-weight: 500;
}
@font-face {
  font-family: "Gilroy";
  src: url("/fonts/Gilroy/Gilroy-SemiBold.ttf");
  font-weight: 600;
}
@font-face {
  font-family: "Gilroy";
  src: url("/fonts/Gilroy/Gilroy-Bold.ttf");
  font-weight: 700;
}
@font-face {
  font-family: "Gilroy";
  src: url("/fonts/Gilroy/Gilroy-ExtraBold.ttf");
  font-weight: 800;
}
@font-face {
  font-family: "Gilroy";
  src: url("/fonts/Gilroy/Gilroy-Black.ttf");
  font-weight: 900;
}
@font-face {
  font-family: "Gilroy";
  src: url("/fonts/Gilroy/Gilroy-Heavy.ttf");
  font-weight: 1000;
}


html{
  scroll-behavior: smooth;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;

  color: ${COLORS.very_dark_purple};
  font-family: 'Gilroy';
}

a {
  text-decoration: none;
}
`
