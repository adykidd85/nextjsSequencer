"use client"

import {
    Alert, FlexGrid,
    H3,
    Body1,
    Spacing,
    theme,
    ThemeProps, Caption, H1
} from "@burstsms/react-components";
import { createGlobalStyle, styled } from "styled-components";
import React, { useEffect,useContext,createContext  } from "react";


import { normalize } from 'styled-normalize';
interface Props {
    id?: string;
    className?: string;
}

const GlobalStyle = createGlobalStyle`
      ${normalize}
  `;
const StyledContainer = styled(FlexGrid.Column)`
  padding: 10px;
  color: theme.colors.primary.blue;
`;
/*
const CaptionContainer = styled(Alert.Column)`
  padding: 10px;
  color: theme.colors.primary.blue;
`; */
export default function home() {



    useEffect(() => { });
    return (<Body1> thisis home page
    </Body1>
    )
}

