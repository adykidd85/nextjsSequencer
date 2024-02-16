import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import { reset } from './reset';

export const GlobalStyle = createGlobalStyle`
  ${normalize}
  ${reset}
`;

export default GlobalStyle;
