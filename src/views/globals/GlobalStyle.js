import { createGlobalStyle } from "styled-components";
import colors from "../../utils/colors";


export default createGlobalStyle`
   * {
      box-sizing: border-box;
      transition: all 200ms;
		font-family: 'Roboto', sans-serif;
      color: ${colors.blackDefault};
      font-weight: normal;
      font-size: 15px;
      line-height: 1.6;
   }
   
   html, body {
      padding: 0;
      margin: 0;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
		scroll-behavior: smooth;
      height: 100%;
   }

   h1, h2, h3, h4, h5, h6 {
      line-height: 1.3;
      font-weight: 700;
      margin: 0;
      color: ${colors.black};
   }

   h1 { font-size: 72px; }
   h2 { font-size: 60px; }
   h3 { font-size: 48px; }
   h4 { font-size: 36px; }
   h5 { font-size: 24px; }
   h6 { font-size: 18px;}

   @media (max-width: 64rem) {
      h1 { font-size: 60px; }
		h2 { font-size: 48px; }
		h3 { font-size: 36px; }
   }
   @media (max-width: 32rem) {
      h1 { font-size: 48px; }
		h2 { font-size: 36px; }
		h3 { font-size: 24px; }
   }
   
   p {
      color: ${colors.blackDefault};
		line-height: 2.0;
   }
   
   a {
      color: ${colors.brand};
      font-size: 16px;
      text-decoration: none;
   }

	button {
		border: none;
		background: none;
	}
   
   hr {
      border: none;
      height: 1px;
      background: ${colors.border};
      margin-bottom: 30px;
      margin-top: 15px;
      
      &.no-margin { margin: 0 !important; }
   }
   
   .bg {
      &-gray { background: ${colors.gray}; }
      &-black { background: ${colors.black}; }
      &-white { background: ${colors.white}; }
   }
   
   .text {
      &-black { color: ${colors.black}; }
      &-white {color: ${colors.white}}
      &-gray {color: ${colors.gray}; }
      &-center { text-align: center; }
      &-capitalize { text-transform: capitalize; }
      &-uppercase { text-transform: uppercase; }
      &-justify { text-align: justify; }
      &-right { text-align: right;}
      &-700 { font-weight: 700; }
		&-600 { font-weight: 600; }
      &-400 { font-weight: 400; }
   }
   
   .form-error {
      color: ${colors.error};
      font-size: 14px;
      font-weight: 600;
   }
`

